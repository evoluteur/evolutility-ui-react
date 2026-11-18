// Evolutility-UI-React :: /ui/CodeEditor/CodeEditor.tsx

// Text editor for JSON5 (CodeMirror 6): syntax highlighting, line numbers,
// errors underlined, and, w/ a JSON Schema: validation, autocomplete of
// property names, and descriptions on hover.
// Colors follow the light/dark theme (CSS variables "--evo-code-*").

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { keymap } from "@codemirror/view";
import { Annotation, StateEffect, StateField } from "@codemirror/state";
import { linter, type Diagnostic } from "@codemirror/lint";
import { indentWithTab } from "@codemirror/commands";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import { json5Schema } from "codemirror-json-schema/json5";
import { getJsonPointers, updateSchema } from "codemirror-json-schema";
import type { JSONSchema7 } from "json-schema";

import "./CodeEditor.scss";

// - error from outside the editor (ex: the server), at a JSON pointer
export interface Marker {
  /** JSON pointer of the property (ex: "/fields/2/column") */
  path: string;
  message: string;
}

export interface CodeEditorProps {
  /** Text in the editor */
  value: string;
  /** Called w/ the new text after each change by the user */
  onChange: (value: string) => void;
  /** JSON Schema to validate the text, suggest properties, and describe them */
  schema?: JSONSchema7 | null;
  /** Accessible name of the editor */
  ariaLabel?: string;
  /** Errors to underline at properties (ex: errors from the server) */
  markers?: Marker[];
}

// - changes made by the "value" prop (not by the user)
const fromProps = Annotation.define<boolean>();

// - markers, kept in the editor state
const setMarkers = StateEffect.define<Marker[]>();
const markersField = StateField.define<Marker[]>({
  create: () => [],
  update: (value, tr) =>
    tr.effects.reduce((v, e) => (e.is(setMarkers) ? e.value : v), value),
});

// - underline each marker at its property (positions found again on each
//   change: the marker follows its property). If the property is gone, its
//   closest parent is underlined.
const markersLinter = linter(
  (view) => {
    const markers = view.state.field(markersField);
    if (!markers.length) return [];
    let pointers: ReturnType<typeof getJsonPointers>;
    try {
      pointers = getJsonPointers(view.state, "json5");
    } catch {
      return [];
    }
    return markers.map((m): Diagnostic => {
      let path = m.path;
      let pos = pointers.get(path);
      while (!pos && path) {
        path = path.slice(0, path.lastIndexOf("/"));
        pos = pointers.get(path);
      }
      const p = (pos || {}) as Partial<{
        keyFrom: number;
        keyTo: number;
        valueFrom: number;
        valueTo: number;
      }>;
      const from = p.keyFrom ?? p.valueFrom ?? 0;
      const to = p.valueTo ?? p.keyTo ?? Math.min(1, view.state.doc.length);
      return {
        from,
        to,
        severity: "error",
        source: "server",
        message: m.message,
      };
    });
  },
  {
    delay: 0,
    needsRefresh: (update) =>
      update.transactions.some((tr) =>
        tr.effects.some((e) => e.is(setMarkers)),
      ),
  },
);

const highlightStyle = HighlightStyle.define([
  { tag: t.propertyName, color: "var(--evo-code-key)" },
  { tag: t.string, color: "var(--evo-code-string)" },
  { tag: t.number, color: "var(--evo-code-number)" },
  { tag: [t.bool, t.null], color: "var(--evo-code-keyword)" },
  {
    tag: [t.lineComment, t.blockComment],
    color: "var(--evo-code-comment)",
    fontStyle: "italic",
  },
]);

const theme = EditorView.theme({
  "&": {
    color: "var(--evo-text)",
    backgroundColor: "var(--evo-bg-input)",
  },
  ".cm-content": { caretColor: "var(--evo-text)" },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "var(--evo-text)" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection":
    { backgroundColor: "var(--evo-code-selection) !important" },
  ".cm-gutters": {
    color: "var(--evo-text-secondary)",
    backgroundColor: "var(--evo-bg-header)",
    borderRight: "1px solid var(--evo-border)",
  },
  ".cm-activeLine, .cm-activeLineGutter": {
    backgroundColor: "var(--evo-bg-hover)",
  },
  ".cm-tooltip": {
    color: "var(--evo-text)",
    backgroundColor: "var(--evo-bg)",
    border: "1px solid var(--evo-border)",
  },
  ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
    color: "var(--evo-text)",
    backgroundColor: "var(--evo-code-selection)",
  },
});

const CodeEditor = ({
  value,
  onChange,
  schema,
  ariaLabel,
  markers,
}: CodeEditorProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // - create the editor once
  useEffect(() => {
    const view = new EditorView({
      parent: parentRef.current!,
      doc: value,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        json5Schema(),
        markersField,
        markersLinter,
        syntaxHighlighting(highlightStyle),
        theme,
        EditorView.contentAttributes.of(
          ariaLabel ? { "aria-label": ariaLabel } : {},
        ),
        EditorView.updateListener.of((update) => {
          if (
            update.docChanged &&
            !update.transactions.some((tr) => tr.annotation(fromProps))
          ) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
      ],
    });
    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // - text changed from outside (model loaded, old version...)
  useEffect(() => {
    const view = viewRef.current;
    if (view && view.state.doc.toString() !== value) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
        annotations: fromProps.of(true),
      });
    }
  }, [value]);

  useEffect(() => {
    viewRef.current?.dispatch({ effects: setMarkers.of(markers || []) });
  }, [markers]);

  // - the schema can arrive after the editor is created
  useEffect(() => {
    if (viewRef.current) {
      updateSchema(viewRef.current, schema || undefined);
    }
  }, [schema]);

  return (
    <div
      className="evo-code-editor"
      ref={parentRef}
      data-testid="code-editor"
    />
  );
};

export default CodeEditor;
