// Evolutility-UI-React :: shell/AuthGate/AuthGate.tsx
// Shows the login page when the server needs a login, otherwise loads the
// models (for this user) and shows the app.
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import type { ReactNode } from "react";
import { useModelsBoot, useSession } from "dao/queries";
import Spinner from "components/ui/Spinner/Spinner";
import Login from "pages/Login/Login";

const AuthGate = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const s = session.data;
  const needLogin = !!s && s.authEnabled && !s.role;
  // - server not reachable: try to load the models anyway (to show the error)
  const ready = (!!s && !needLogin) || session.isError;
  const models = useModelsBoot(ready, s?.user?.id ?? null);

  if (session.isPending) {
    return <Spinner />;
  }
  if (needLogin) {
    return <Login />;
  }
  if (models.isPending) {
    return <Spinner />;
  }
  return <>{children}</>;
};

export default AuthGate;
