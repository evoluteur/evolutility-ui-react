import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EditorView } from "@codemirror/view";
import CodeEditor from "./CodeEditor";

// - jsdom has no layout: CodeMirror needs these to measure text
const rect = () =>
  ({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 }) as DOMRect;
Range.prototype.getClientRects = () =>
  ({
    length: 0,
    item: () => null,
    [Symbol.iterator]: [][Symbol.iterator],
  }) as unknown as DOMRectList;
Range.prototype.getBoundingClientRect = rect;

const editorView = () =>
  EditorView.findFromDOM(
    screen
      .getByTestId("code-editor")
      .querySelector(".cm-editor") as HTMLElement,
  )!;

describe("CodeEditor", () => {
  it("shows the text", () => {
    render(
      <CodeEditor
        value={'{ id: "todo" }'}
        onChange={() => {}}
        ariaLabel="JSON5"
      />,
    );
    expect(editorView().state.doc.toString()).toBe('{ id: "todo" }');
    expect(screen.getByLabelText("JSON5")).toBeTruthy();
  });

  it("calls onChange when the user types", () => {
    const onChange = vi.fn();
    render(<CodeEditor value="{}" onChange={onChange} />);
    const view = editorView();
    view.dispatch({
      changes: { from: 1, insert: " a: 1 " },
      userEvent: "input",
    });
    expect(onChange).toHaveBeenCalledWith("{ a: 1 }");
  });

  it("follows the value prop w/o calling onChange", () => {
    const onChange = vi.fn();
    const { rerender } = render(<CodeEditor value="{}" onChange={onChange} />);
    rerender(<CodeEditor value={'{ id: "book" }'} onChange={onChange} />);
    expect(editorView().state.doc.toString()).toBe('{ id: "book" }');
    expect(onChange).not.toHaveBeenCalled();
  });

  it("accepts a schema after it was created", () => {
    const { rerender } = render(<CodeEditor value="{}" onChange={() => {}} />);
    rerender(
      <CodeEditor
        value="{}"
        onChange={() => {}}
        schema={{ type: "object", properties: { id: { type: "string" } } }}
      />,
    );
    expect(editorView().state.doc.toString()).toBe("{}");
  });
});
