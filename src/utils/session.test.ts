import { afterEach, describe, expect, it } from "vitest";
import { can, getSession, hasRole, resetSession, setSession } from "./session";

afterEach(resetSession);

describe("session", () => {
  it("allows everything until the server says otherwise", () => {
    expect(getSession().authEnabled).toBe(false);
    expect(can("admin")).toBe(true);
  });

  it("ranks roles", () => {
    expect(hasRole("admin", "editor")).toBe(true);
    expect(hasRole("editor", "editor")).toBe(true);
    expect(hasRole("viewer", "editor")).toBe(false);
    expect(hasRole(null, "viewer")).toBe(false);
  });

  it("follows the role of the session", () => {
    setSession({ authEnabled: true, user: null, role: "viewer" });
    expect(can("viewer")).toBe(true);
    expect(can("editor")).toBe(false);
    setSession({ authEnabled: true, user: null, role: null });
    expect(can("viewer")).toBe(false);
  });
});
