import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthGate from "./AuthGate";
import UserMenu from "components/shell/TopBar/UserMenu";
import { resetSession } from "utils/session";
import { setModels, getModel } from "utils/moMa";
import todo from "../../../fixtures/todo";

const calls: {
  url: string;
  method?: string;
  body?: string;
  credentials?: string;
}[] = [];
let loggedIn = false;

// - fake server: login needed, then "ada" is an admin
const mockServer = (authEnabled = true) => {
  calls.length = 0;
  loggedIn = false;
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string, options: RequestInit = {}) => {
      calls.push({
        url,
        method: options.method,
        body: options.body as string,
        credentials: options.credentials,
      });
      const user = { id: 1, email: "ada@test.io", name: "Ada", role: "admin" };
      let status = 200;
      let data: unknown;
      if (url.endsWith("auth/me")) {
        data =
          loggedIn || !authEnabled
            ? { authEnabled, user: authEnabled ? user : null, role: "admin" }
            : { authEnabled: true, user: null, role: null };
      } else if (url.endsWith("auth/login")) {
        const { password } = JSON.parse(options.body as string);
        if (password === "good-pass") {
          loggedIn = true;
          data = { user };
        } else {
          status = 401;
          data = { error: "Invalid email or password." };
        }
      } else if (url.endsWith("auth/logout")) {
        loggedIn = false;
        data = { ok: true };
      } else if (url.endsWith("meta/models")) {
        data = [{ ...todo, id: "book", title: "Books", active: true }];
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

const renderApp = () =>
  render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <MemoryRouter>
        <AuthGate>
          <UserMenu />
          <div>The app</div>
        </AuthGate>
      </MemoryRouter>
    </QueryClientProvider>,
  );

afterEach(() => {
  vi.unstubAllGlobals();
  resetSession();
  setModels([todo]);
});

describe("AuthGate", () => {
  it("shows the login page, then the app w/ the models of the user", async () => {
    mockServer();
    renderApp();
    expect(await screen.findByTestId("login")).toBeTruthy();
    expect(screen.queryByText("The app")).toBeNull();
    expect(calls.some((c) => c.url.endsWith("meta/models"))).toBe(false);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "ada@test.io" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "good-pass" },
    });
    fireEvent.click(screen.getByText("Log in"));

    expect(await screen.findByText("The app")).toBeTruthy();
    expect(screen.getByTestId("user-menu")).toHaveTextContent("Ada");
    expect(getModel("book")?.title).toBe("Books");
    // - the session cookie is sent
    expect(calls.every((c) => c.credentials === "include")).toBe(true);
  });

  it("asks the browser to save the password after a login", async () => {
    const stored: unknown[] = [];
    class PasswordCredential {
      data: unknown;
      constructor(data: unknown) {
        this.data = data;
      }
    }
    vi.stubGlobal("PasswordCredential", PasswordCredential);
    Object.defineProperty(navigator, "credentials", {
      configurable: true,
      value: {
        store: (c: PasswordCredential) => (
          stored.push(c.data),
          Promise.resolve(c)
        ),
      },
    });
    mockServer();
    renderApp();
    await screen.findByTestId("login");
    const form = screen.getByTestId("login").querySelector("form")!;
    expect(form.getAttribute("method")).toBe("post");
    expect(screen.getByLabelText("Email").getAttribute("name")).toBe("email");
    expect(screen.getByLabelText("Password").getAttribute("autocomplete")).toBe(
      "current-password",
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "ada@test.io" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "good-pass" },
    });
    fireEvent.click(screen.getByText("Log in"));
    await screen.findByText("The app");
    expect(stored).toEqual([
      { id: "ada@test.io", password: "good-pass", name: "Ada" },
    ]);
    Reflect.deleteProperty(navigator, "credentials");
  });

  it("doesn't ask to save a wrong password", async () => {
    const store = vi.fn();
    vi.stubGlobal("PasswordCredential", class {});
    Object.defineProperty(navigator, "credentials", {
      configurable: true,
      value: { store },
    });
    mockServer();
    renderApp();
    await screen.findByTestId("login");
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "ada@test.io" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "bad" },
    });
    fireEvent.click(screen.getByText("Log in"));
    await screen.findByText("Invalid email or password.");
    expect(store).not.toHaveBeenCalled();
    Reflect.deleteProperty(navigator, "credentials");
  });

  it("shows the error of a failed login", async () => {
    mockServer();
    renderApp();
    await screen.findByTestId("login");
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "ada@test.io" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "bad" },
    });
    fireEvent.click(screen.getByText("Log in"));
    expect(await screen.findByText("Invalid email or password.")).toBeTruthy();
  });

  it("asks for email and password before calling the server", async () => {
    mockServer();
    renderApp();
    fireEvent.click(await screen.findByText("Log in"));
    expect(
      await screen.findByText("Email and password are required."),
    ).toBeTruthy();
    expect(calls.some((c) => c.url.endsWith("auth/login"))).toBe(false);
  });

  it("goes back to the login page after logout", async () => {
    mockServer();
    loggedIn = true;
    renderApp();
    fireEvent.click(await screen.findByText("Log out"));
    expect(await screen.findByTestId("login")).toBeTruthy();
  });

  it("shows the app directly when the server has no login", async () => {
    mockServer(false);
    renderApp();
    expect(await screen.findByText("The app")).toBeTruthy();
    expect(screen.queryByTestId("user-menu")).toBeNull();
  });
});
