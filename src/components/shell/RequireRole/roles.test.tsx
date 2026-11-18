// - links and pages hidden by role (the server refuses these actions anyway)
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { resetSession, setSession } from "utils/session";
import { getModel } from "utils/moMa";
import ViewsNavIcons from "components/views/ViewHeader/ViewsNavIcons";
import Card from "components/views/one/Card";
import Browse from "components/views/one/Browse/Browse";
import EvolRoutes from "routes/EvolRoutes";
import RequireRole from "./RequireRole";
import type { Role } from "types/api";

vi.mock("components/views/one/One", () => ({
  default: () => <div>ONE VIEW</div>,
}));
vi.mock("components/views/many/Many", () => ({
  default: () => <div>MANY VIEW</div>,
}));

const as = (role: Role) =>
  setSession({
    authEnabled: true,
    user: { id: 1, email: "u@t.io", role },
    role,
  });

afterEach(resetSession);

const todo = getModel("todo")!;
const record = { id: 5, title: "Buy milk" };

describe("hidden for viewers, shown to editors", () => {
  it("Browse/Edit toggle", () => {
    as("viewer");
    const { unmount } = render(
      <MemoryRouter>
        <ViewsNavIcons entity="todo" view="browse" id="5" />
      </MemoryRouter>,
    );
    expect(screen.queryByLabelText("Edit")).toBeNull();
    unmount();
    as("editor");
    render(
      <MemoryRouter>
        <ViewsNavIcons entity="todo" view="browse" id="5" />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText("Edit")).toBeTruthy();
  });

  it("edit and delete icons on cards", () => {
    as("viewer");
    const { unmount } = render(
      <MemoryRouter>
        <Card
          entity="todo"
          data={record}
          fields={todo.fields}
          onDelete={() => {}}
        />
      </MemoryRouter>,
    );
    expect(screen.queryByLabelText("Edit")).toBeNull();
    expect(screen.queryByLabelText("Delete")).toBeNull();
    unmount();
    as("editor");
    render(
      <MemoryRouter>
        <Card
          entity="todo"
          data={record}
          fields={todo.fields}
          onDelete={() => {}}
        />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText("Edit")).toBeTruthy();
    expect(screen.getByLabelText("Delete")).toBeTruthy();
  });

  it("Edit button in Browse", () => {
    as("viewer");
    const { unmount } = render(
      <MemoryRouter>
        <Browse entity="todo" model={todo} data={record} />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Edit")).toBeNull();
    unmount();
    as("editor");
    render(
      <MemoryRouter>
        <Browse entity="todo" model={todo} data={record} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Edit")).toBeTruthy();
  });
});

const Where = () => <div data-testid="where">{useLocation().pathname}</div>;
const openAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/demos/*"
          element={
            <>
              <EvolRoutes />
              <Where />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

describe("Edit url", () => {
  it("sends viewers to Browse (or the list for a new record)", async () => {
    as("viewer");
    const { unmount } = openAt("/demos/todo/edit/5");
    expect(await screen.findByText("ONE VIEW")).toBeTruthy();
    expect(screen.getByTestId("where")).toHaveTextContent(
      "/demos/todo/browse/5",
    );
    unmount();
    openAt("/demos/todo/edit/0");
    expect(screen.getByTestId("where")).toHaveTextContent("/demos/todo/list");
  });

  it("opens Edit for editors", () => {
    as("editor");
    openAt("/demos/todo/edit/5");
    expect(screen.getByTestId("where")).toHaveTextContent("/demos/todo/edit/5");
  });
});

describe("RequireRole", () => {
  it("shows the page to admins only", () => {
    as("editor");
    const { unmount } = render(
      <RequireRole role="admin">ADMIN PAGE</RequireRole>,
    );
    expect(screen.queryByText("ADMIN PAGE")).toBeNull();
    expect(screen.getByText("This page needs the admin role.")).toBeTruthy();
    unmount();
    as("admin");
    render(<RequireRole role="admin">ADMIN PAGE</RequireRole>);
    expect(screen.getByText("ADMIN PAGE")).toBeTruthy();
  });
});
