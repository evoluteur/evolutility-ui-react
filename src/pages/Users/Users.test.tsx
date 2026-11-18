import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Users from "./Users";
import { resetSession, setSession } from "utils/session";

const calls: { url: string; method?: string; body?: unknown }[] = [];
let users = [
  {
    id: 1,
    email: "ada@t.io",
    name: "Ada",
    role: "admin",
    active: true,
    lastLoginAt: null,
    createdAt: null,
  },
  {
    id: 2,
    email: "bob@t.io",
    name: "Bob",
    role: "viewer",
    active: true,
    lastLoginAt: null,
    createdAt: null,
  },
];

const mockServer = () => {
  calls.length = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string, options: RequestInit = {}) => {
      const body = options.body
        ? JSON.parse(options.body as string)
        : undefined;
      calls.push({ url, method: options.method, body });
      let status = 200;
      let data: unknown = users;
      if (options.method === "POST") {
        const user = {
          id: 3,
          active: true,
          lastLoginAt: null,
          createdAt: null,
          ...body,
        };
        users = [...users, user];
        status = 201;
        data = { user, password: body.password ? undefined : "Gen3rated-pw" };
      } else if (options.method === "PATCH") {
        const id = Number(url.split("/").pop());
        users = users.map((u) => (u.id === id ? { ...u, ...body } : u));
        data = {
          user: users.find((u) => u.id === id),
          password: body.resetPassword ? "Fresh-pw-123" : undefined,
        };
      } else if (options.method === "DELETE") {
        const id = Number(url.split("/").pop());
        users = users.filter((u) => u.id !== id);
        data = { id };
      }
      return Promise.resolve({
        ok: status < 400,
        status,
        statusText: "",
        json: () => Promise.resolve(data),
      } as Response);
    }),
  );
};

const renderPage = () =>
  render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    </QueryClientProvider>,
  );

const writes = () => calls.filter((c) => c.method && c.method !== "GET");

beforeEach(() => {
  users = users.slice(0, 2);
  setSession({
    authEnabled: true,
    user: { id: 1, email: "ada@t.io", name: "Ada", role: "admin" },
    role: "admin",
  });
  mockServer();
});
afterEach(() => {
  vi.unstubAllGlobals();
  resetSession();
});

describe("Users", () => {
  it("lists the users; you can't change your own role or delete yourself", async () => {
    renderPage();
    const me = (await screen.findByText("ada@t.io")).closest("tr")!;
    expect(me).toHaveTextContent("(you)");
    expect(within(me).getByLabelText("Role ada@t.io")).toBeDisabled();
    expect(within(me).getByLabelText("Active ada@t.io")).toBeDisabled();
    expect(within(me).queryByText("Delete")).toBeNull();
    const bob = screen.getByText("bob@t.io").closest("tr")!;
    expect(within(bob).getByLabelText("Role bob@t.io")).not.toBeDisabled();
  });

  it("creates a user and shows the generated password once", async () => {
    renderPage();
    fireEvent.click(await screen.findByText("New user"));
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "cy@t.io" },
    });
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Cy" },
    });
    fireEvent.change(screen.getByLabelText("Role"), {
      target: { value: "editor" },
    });
    fireEvent.click(screen.getByText("Create"));
    expect(await screen.findByText(/Gen3rated-pw/)).toBeTruthy();
    expect(writes()[0].body).toEqual({
      email: "cy@t.io",
      name: "Cy",
      role: "editor",
    });
    expect(await screen.findByText("cy@t.io")).toBeTruthy();
  });

  it("changes a role, deactivates, and sets a new password", async () => {
    renderPage();
    fireEvent.change(await screen.findByLabelText("Role bob@t.io"), {
      target: { value: "editor" },
    });
    await vi.waitFor(() => expect(writes()).toHaveLength(1));
    expect(writes()[0]).toMatchObject({
      method: "PATCH",
      body: { role: "editor" },
    });
    fireEvent.click(screen.getByLabelText("Active bob@t.io"));
    await vi.waitFor(() => expect(writes()).toHaveLength(2));
    expect(writes()[1].body).toEqual({ active: false });
    const bob = screen.getByText("bob@t.io").closest("tr")!;
    fireEvent.click(within(bob).getByText("New password"));
    expect(await screen.findByText(/Fresh-pw-123/)).toBeTruthy();
  });

  it("deletes a user after confirmation", async () => {
    renderPage();
    const bob = (await screen.findByText("bob@t.io")).closest("tr")!;
    fireEvent.click(within(bob).getByText("Delete"));
    expect(screen.getByTestId("modal")).toHaveTextContent(
      'Delete the user "bob@t.io"?',
    );
    expect(writes()).toHaveLength(0);
    fireEvent.click(screen.getByText("OK"));
    await vi.waitFor(() => expect(writes()[0]?.method).toBe("DELETE"));
    expect(writes()[0].url).toMatch(/auth\/users\/2$/);
  });
});
