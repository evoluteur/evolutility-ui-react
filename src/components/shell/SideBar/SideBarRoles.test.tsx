import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideBar from "./SideBar";
import { resetSession, setSession } from "utils/session";

afterEach(resetSession);

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <SideBar />
    </MemoryRouter>,
  );

describe("SideBar by role", () => {
  it("shows add and Designer links to admins", () => {
    setSession({
      authEnabled: true,
      user: { id: 1, email: "a@b.c", role: "admin" },
      role: "admin",
    });
    renderAt("/demos/todo/list");
    expect(screen.getAllByLabelText("Add").length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText("Edit model").length).toBeGreaterThan(0);
    expect(screen.getByTestId("sidebar")).toHaveTextContent("Designer");
  });

  it("hides them from viewers", () => {
    setSession({
      authEnabled: true,
      user: { id: 2, email: "v@b.c", role: "viewer" },
      role: "viewer",
    });
    renderAt("/demos/todo/list");
    expect(screen.queryAllByLabelText("Add")).toHaveLength(0);
    expect(screen.queryAllByLabelText("Edit model")).toHaveLength(0);
    expect(screen.getByTestId("sidebar")).not.toHaveTextContent("Designer");
  });
});
