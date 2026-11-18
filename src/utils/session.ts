// Evolutility-UI-React :: utils/session.ts

// Who is logged in, and w/ which role (from the server: "auth/me").
// Components use it to hide what the role can't do (the server checks anyway).
// Roles: viewer (read), editor (+ write records), admin (+ edit models).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useSyncExternalStore } from "react";
import type { Role, Session } from "types/api";

const roles: Role[] = ["viewer", "editor", "admin"];

// - until the server says otherwise: no login, everything allowed
const noAuth: Session = { authEnabled: false, user: null, role: "admin" };

let session: Session = noAuth;
const listeners = new Set<() => void>();

export const getSession = () => session;

export function setSession(s: Session) {
  session = s;
  listeners.forEach((l) => l());
}

export const resetSession = () => setSession(noAuth);

// - true if the role is at least "needed"
export const hasRole = (role: Role | null | undefined, needed: Role) =>
  !!role && roles.indexOf(role) >= roles.indexOf(needed);

export const can = (needed: Role) => hasRole(session.role, needed);

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

// - hook: the session (re-renders when it changes)
export const useSession = () => useSyncExternalStore(subscribe, getSession);

// - hook: can the current user do what needs this role?
export const useCan = (needed: Role) => hasRole(useSession().role, needed);
