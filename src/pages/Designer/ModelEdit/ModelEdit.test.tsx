import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModelEdit from "./ModelEdit";

// - CodeMirror is tested in its own component: a textarea is enough here
vi.mock("components/ui/CodeEditor/CodeEditor", () => ({
  default: ({
    value,
    onChange,
    ariaLabel,
    markers,
  }: {
    value: string;
    onChange: (v: string) => void;
    ariaLabel?: string;
    markers?: { path: string; message: string }[];
  }) => (
    <textarea
      aria-label={ariaLabel}
      value={value}
      data-markers={JSON.stringify(markers || [])}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

const saves = () =>
  calls.filter((c) => c.method === "POST" || c.method === "PUT");

const calls: { url: string; method?: string; body?: string }[] = [];

const mockFetch = (handler: (url: string, method?: string) => unknown) => {
  calls.length = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string, options: RequestInit = {}) => {
      calls.push({ url, method: options.method, body: options.body as string });
      const data = handler(url, options.method);
      const status = (data as { _status?: number })?._status || 200;
      return Promise.resolve({
        ok: status < 400,
        status,
        statusText: "",
        json: () => Promise.resolve(data),
      } as Response);
    }),
  );
};

const renderAt = (path: string) =>
  render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/designer/:id" element={<ModelEdit />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

afterEach(() => vi.unstubAllGlobals());

describe("ModelEdit", () => {
  it("checks a new model and shows the SQL", async () => {
    mockFetch(() => ({
      model: { id: "book" },
      sql: ['CREATE TABLE IF NOT EXISTS "evolutility"."book"(...)'],
      warnings: ['Table "book" will be created.'],
      dryRun: true,
    }));
    renderAt("/designer/new");
    expect(
      (screen.getByLabelText("JSON5") as HTMLTextAreaElement).value,
    ).toContain('id: "book"');
    fireEvent.click(screen.getByText("Check changes"));
    expect(await screen.findByText(/CREATE TABLE IF NOT EXISTS/)).toBeTruthy();
    // - collapsed, w/ the number of changes
    const summary = screen.getByText("Changes to the database (1)");
    const details = summary.closest("details")!;
    expect(details.open).toBe(false);
    fireEvent.click(summary);
    expect(details.open).toBe(true);
    expect(screen.getByText('Table "book" will be created.')).toBeTruthy();
    expect(saves()[0].url).toContain("meta/models?dryRun=true");
    expect(saves()[0].method).toBe("POST");
  });

  it("loads a model and saves it w/ its version", async () => {
    const fields = [
      { id: "title", type: "text", label: "Title", inMany: true },
    ];
    mockFetch((url, method) => {
      if (url.includes("/history")) return [];
      if (method === "PUT") {
        return {
          model: {
            id: "todo",
            name: "task",
            namePlural: "tasks",
            fields,
            _version: 8,
          },
          sql: [],
          warnings: [],
          dryRun: false,
        };
      }
      return {
        id: "todo",
        name: "task",
        namePlural: "tasks",
        fields,
        _version: 7,
      };
    });
    renderAt("/designer/todo");
    const editor = (await screen.findByLabelText(
      "JSON5",
    )) as HTMLTextAreaElement;
    expect(editor.value).not.toContain("_version");
    fireEvent.change(editor, {
      target: { value: editor.value.replace('"task"', '"todo item"') },
    });
    fireEvent.click(screen.getByText("Save"));
    await screen.findByText("No changes to the database.");
    const put = calls.find((c) => c.method === "PUT")!;
    expect(JSON.parse(put.body!)).toMatchObject({
      name: "todo item",
      _version: 7,
    });
  });

  it("shows invalid JSON without calling the server", async () => {
    mockFetch(() => ({}));
    renderAt("/designer/new");
    fireEvent.change(screen.getByLabelText("JSON5"), {
      target: { value: "{ oops" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(await screen.findByText(/Invalid JSON5/)).toBeTruthy();
    expect(saves().length).toBe(0);
  });

  it("lists invalid properties returned by the server", async () => {
    mockFetch(() => ({
      _status: 400,
      error: "Invalid model",
      invalids: [
        { id: "fields[0].column", value: "a b", condition: "letters only" },
      ],
    }));
    renderAt("/designer/new");
    fireEvent.click(screen.getByText("Save"));
    expect(
      await screen.findByText('fields[0].column: letters only ("a b")'),
    ).toBeTruthy();
    // - also underlined in the editor, at the property
    expect(
      JSON.parse(screen.getByLabelText("JSON5").getAttribute("data-markers")!),
    ).toEqual([{ path: "/fields/0/column", message: "letters only (server)" }]);
  });

  it("asks for confirmation in a dialog before deleting", async () => {
    const fields = [
      { id: "title", type: "text", label: "Title", inMany: true },
    ];
    mockFetch((url, method) => {
      if (url.includes("/history")) return [];
      if (method === "DELETE") return { id: "todo" };
      return {
        id: "todo",
        name: "task",
        namePlural: "tasks",
        fields,
        _version: 1,
      };
    });
    renderAt("/designer/todo");
    const [deleteButton] = await screen.findAllByText("Delete model");
    fireEvent.click(deleteButton.closest("button")!);
    const dialog = screen.getByTestId("modal") as HTMLDialogElement;
    expect(dialog.open).toBe(true);
    expect(dialog).toHaveTextContent('Delete model "todo"?');
    expect(calls.some((c) => c.method === "DELETE")).toBe(false);
    fireEvent.click(screen.getByText("OK"));
    await vi.waitFor(() =>
      expect(calls.some((c) => c.method === "DELETE")).toBe(true),
    );
    expect(dialog.open).toBe(false);
  });

  it("checks the model w/ the server after typing (live check)", async () => {
    mockFetch(() => ({
      model: { id: "book" },
      sql: ["ALTER TABLE x"],
      warnings: [],
      dryRun: true,
    }));
    renderAt("/designer/new");
    const editor = screen.getByLabelText("JSON5") as HTMLTextAreaElement;
    fireEvent.change(editor, { target: { value: editor.value + " " } });
    fireEvent.change(editor, { target: { value: editor.value + "  " } });
    expect(saves().length).toBe(0); // - not before the pause
    expect(
      await screen.findByText("ALTER TABLE x", {}, { timeout: 3000 }),
    ).toBeTruthy();
    expect(saves().length).toBe(1); // - one check for both changes
    expect(saves()[0].url).toContain("dryRun=true");
  });

  it("doesn't call the server while the text is not valid JSON5", async () => {
    mockFetch(() => ({}));
    renderAt("/designer/new");
    fireEvent.change(screen.getByLabelText("JSON5"), {
      target: { value: "{ oops" },
    });
    await new Promise((r) => setTimeout(r, 1300));
    expect(saves().length).toBe(0);
    expect(screen.queryByText(/Invalid JSON5/)).toBeNull(); // - shown in the editor
  });
});
