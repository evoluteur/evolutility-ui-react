// Evolutility-UI-React :: pages/Login/Login.tsx
// Login form (email and password). The server sets a session cookie.
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useEffect, useState, type FormEvent } from "react";
import { useLogin } from "dao/queries";
import { i18n_login as i18n } from "i18n/i18n";
import Alert from "components/ui/Alert/Alert";

import "./Login.scss";

// - Tell the browser the login worked, so it offers to save the password
//   (Credential Management API: Chrome, Edge). Without it, browsers guess
//   from the form disappearing, which is less reliable in a single-page app.
export const rememberPassword = (
  email: string,
  password: string,
  name?: string | null,
) => {
  const PC = (
    window as unknown as {
      PasswordCredential?: new (data: object) => Credential;
    }
  ).PasswordCredential;
  if (PC && navigator.credentials?.store) {
    navigator.credentials
      .store(new PC({ id: email, password, name: name || email }))
      .catch(() => {
        // - the user said no, or the browser refused: nothing to do
      });
  }
};

export interface LoginProps {
  /** Called after a successful login */
  onLogin?: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const login = useLogin();

  useEffect(() => {
    document.title = "Evolutility - " + i18n.title;
  }, []);

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!email || !password) {
      setError(i18n.required);
      return;
    }
    setError(null);
    login.mutate(
      { email, password },
      {
        onSuccess: ({ user }) => {
          rememberPassword(email, password, user.name);
          onLogin?.();
        },
        onError: (err) => setError(err.message),
      },
    );
  };

  return (
    <div className="evo-login" data-testid="login">
      <form method="post" action="#" onSubmit={onSubmit} noValidate>
        <h1>{i18n.title}</h1>
        <p>{i18n.intro}</p>
        {error && <Alert message={error} />}
        <label htmlFor="evo-login-email">{i18n.email}</label>
        <input
          id="evo-login-email"
          name="email"
          className="form-control"
          type="email"
          autoComplete="username"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="evo-login-password">{i18n.password}</label>
        <input
          id="evo-login-password"
          name="password"
          className="form-control"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={login.isPending}
        >
          {login.isPending ? i18n.loggingIn : i18n.btnLogin}
        </button>
      </form>
    </div>
  );
};

export default Login;
