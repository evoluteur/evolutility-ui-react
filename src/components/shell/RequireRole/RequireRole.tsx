// Evolutility-UI-React :: shell/RequireRole/RequireRole.tsx
// Shows its content only to users w/ the role needed (the server checks too).
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import type { ReactNode } from "react";
import { useCan } from "utils/session";
import { i18n_errors } from "i18n/i18n";
import Alert from "components/ui/Alert/Alert";
import type { Role } from "types/api";

const RequireRole = ({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) =>
  useCan(role) ? (
    <>{children}</>
  ) : (
    <div className="evo-require-role" style={{ padding: "0 20px" }}>
      <Alert
        title={i18n_errors.notAllowed}
        message={i18n_errors.roleNeeded.replace("{0}", role)}
      />
    </div>
  );

export default RequireRole;
