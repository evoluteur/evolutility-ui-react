// Evolutility-UI-React :: pages/Users/Users.tsx
// Users management (admin role): list, create, change role or status,
// new password, delete.
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "dao/queries";
import { useSession } from "utils/session";
import { i18n_actions, i18n_users as i18n } from "i18n/i18n";
import Alert from "components/ui/Alert/Alert";
import Button from "components/ui/Button/Button";
import Modal from "components/ui/Modal/Modal";
import Spinner from "components/ui/Spinner/Spinner";
import type { Role, UserInfo, UserSaveResult } from "types/api";

import "./Users.scss";

const roles: Role[] = ["viewer", "editor", "admin"];

const fill = (txt: string, ...values: string[]) =>
  values.reduce((t, v, i) => t.replace(`{${i}}`, v), txt);

const dateTime = (d: string | null) =>
  d ? new Date(d).toLocaleString() : i18n.never;

const RoleSelect = ({
  value,
  onChange,
  disabled = false,
  label,
}: {
  value: Role;
  onChange: (role: Role) => void;
  disabled?: boolean;
  label: string;
}) => (
  <select
    className="form-control"
    aria-label={label}
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(e.target.value as Role)}
  >
    {roles.map((r) => (
      <option key={r} value={r}>
        {i18n[r]}
      </option>
    ))}
  </select>
);

const emptyForm = { email: "", name: "", role: "viewer" as Role, password: "" };

const Users = () => {
  const { data, error, isLoading } = useUsers();
  const me = useSession().user;
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const [form, setForm] = useState<typeof emptyForm | null>(null);
  // - generated password, shown once
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<UserInfo | null>(null);

  useEffect(() => {
    document.title = "Evolutility - " + i18n.title;
  }, []);

  const showPassword = (r: UserSaveResult) => {
    setNewPassword(
      r.password ? fill(i18n.passwordShown, r.user.email, r.password) : null,
    );
  };
  const onError = (err: Error) => toast.error(err.message);

  const onCreate = (evt: FormEvent) => {
    evt.preventDefault();
    if (!form) return;
    createUser.mutate(
      {
        email: form.email,
        name: form.name || undefined,
        role: form.role,
        password: form.password || undefined,
      },
      {
        onSuccess: (r) => {
          const res = r as UserSaveResult;
          toast.success(fill(i18n.created, res.user.email));
          showPassword(res);
          setForm(null);
        },
        onError,
      },
    );
  };

  const update = (
    u: UserInfo,
    changes: Parameters<typeof updateUser.mutate>[0]["changes"],
  ) =>
    updateUser.mutate(
      { id: u.id, changes },
      {
        onSuccess: (r) => {
          const res = r as UserSaveResult;
          toast.success(fill(i18n.updated, u.email));
          showPassword(res);
        },
        onError,
      },
    );

  const onDelete = () => {
    const u = toDelete!;
    setToDelete(null);
    deleteUser.mutate(u.id, {
      onSuccess: () => toast.success(fill(i18n.deleted, u.email)),
      onError,
    });
  };

  return (
    <div className="evo-users" data-testid="users">
      <div className="evo-page-header">
        <h1 className="page-title">{i18n.title}</h1>
      </div>
      <p>{i18n.intro}</p>

      {newPassword && (
        <Alert type="warning" title={i18n.password} message={newPassword} />
      )}

      {form ? (
        <form className="evo-users-form" onSubmit={onCreate}>
          <label>
            {i18n.email}
            <input
              className="form-control"
              type="email"
              autoComplete="off"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            {i18n.name}
            <input
              className="form-control"
              autoComplete="off"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            {i18n.role}
            <RoleSelect
              label={i18n.role}
              value={form.role}
              onChange={(role) => setForm({ ...form, role })}
            />
          </label>
          <label>
            {i18n.password}
            <input
              className="form-control"
              type="password"
              autoComplete="new-password"
              placeholder={i18n.passwordHelp}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          <div className="evo-users-form-buttons">
            <button type="submit" className="btn btn-primary">
              {i18n.create}
            </button>
            <Button label={i18n.cancel} onClick={() => setForm(null)} />
          </div>
        </form>
      ) : (
        <p>
          <Button
            type="primary"
            icon="add"
            label={i18n.newUser}
            onClick={() => setForm(emptyForm)}
          />
        </p>
      )}

      {isLoading && <Spinner />}
      {error && <Alert message={(error as Error).message} />}
      {data && (
        <table className="table evo-users-list">
          <thead>
            <tr>
              <th>{i18n.email}</th>
              <th>{i18n.name}</th>
              <th>{i18n.role}</th>
              <th>{i18n.active}</th>
              <th>{i18n.lastLogin}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((u) => {
              const isMe = u.id === me?.id;
              return (
                <tr key={u.id} className={u.active ? undefined : "inactive"}>
                  <td>
                    {u.email}
                    {isMe && (
                      <span className="evo-users-me"> ({i18n.you})</span>
                    )}
                  </td>
                  <td>{u.name}</td>
                  <td>
                    <RoleSelect
                      label={`${i18n.role} ${u.email}`}
                      value={u.role}
                      disabled={isMe}
                      onChange={(role) => update(u, { role })}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`${i18n.active} ${u.email}`}
                      checked={u.active}
                      disabled={isMe}
                      onChange={(e) => update(u, { active: e.target.checked })}
                    />
                  </td>
                  <td>{dateTime(u.lastLoginAt)}</td>
                  <td className="evo-users-actions">
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => update(u, { resetPassword: true })}
                    >
                      {i18n.newPassword}
                    </button>
                    {!isMe && (
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => setToDelete(u)}
                      >
                        {i18n.delete}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={!!toDelete}
        onClose={() => setToDelete(null)}
        title={i18n.delete}
        width={380}
        footer={
          <>
            <Button
              label={i18n_actions.cancel}
              onClick={() => setToDelete(null)}
            />
            <Button type="primary" label={i18n_actions.ok} onClick={onDelete} />
          </>
        }
      >
        {toDelete && fill(i18n.deleteConfirm, toDelete.email)}
      </Modal>
    </div>
  );
};

export default Users;
