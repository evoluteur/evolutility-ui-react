// Evolutility-UI-React :: shell/TopBar/UserMenu.tsx
// User logged in (w/ "Log out"), or "Log in" for anonymous visitors.
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "dao/queries";
import { useSession } from "utils/session";
import { i18n_login as i18n } from "i18n/i18n";

const UserMenu = () => {
  const { authEnabled, user } = useSession();
  const logout = useLogout();
  const navigate = useNavigate();

  if (!authEnabled) {
    return null;
  }
  if (!user) {
    return (
      <Link className="evo-user" to="/login">
        {i18n.login}
      </Link>
    );
  }
  const onLogout = () =>
    logout.mutate(undefined, { onSuccess: () => navigate("/") });

  return (
    <div className="evo-user" data-testid="user-menu">
      <span title={`${user.email} (${user.role})`}>
        {user.name || user.email}
      </span>
      <button type="button" onClick={onLogout} disabled={logout.isPending}>
        {i18n.logout}
      </button>
    </div>
  );
};

export default UserMenu;
