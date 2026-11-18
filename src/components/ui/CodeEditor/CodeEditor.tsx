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
import { Annotation } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import { json5Schema } from "codemirror-json-schema/json5";
import { updateSchema } from "codemirror-json-schema";
import type { JSONSchema7 } from "json-schema";

import "./CodeEditor.scss";

export interface CodeEditorProps {
  /** Text in the editor */
  value: string;
  /** Called w/ the new text after each change by the user */
  onChange: (value: string) => void;
  /** JSON Schema to validate the text, suggest properties, and describe them */
  schema?: JSONSchema7 | null;
  /** Accessible name of the editor */
  ariaLabel?: string;
}

// - changes made by the "value" prop (not by the user)
const fromProps = Annotation.define<boolean>();

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
