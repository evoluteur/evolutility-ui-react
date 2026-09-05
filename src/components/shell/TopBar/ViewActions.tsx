// Evolutility-UI-React :: toolbar.tsx

// Toolbar w/ icons for CRUD, export, and charts.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "components/widgets/Modal/Modal";
import { toast } from "react-toastify";
import Icon from "components/widgets/Icon/Icon";
import { evoPath, capitalize } from "utils/format";
import { useDeleteOne } from "dao/queries";
import { i18n_msg, i18n_actions } from "i18n/i18n";
import { getModel } from "utils/moMa";
import Button from "components/widgets/Button/Button";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  n: string;
  readonly: boolean;
}

const menuItems: Record<string, MenuItem> = {
  // new: {id: 'edit/0', label: i18n_actions.new, icon:'add', n:'x', readonly:false},
  del: {
    id: "del",
    label: i18n_actions.delete1,
    icon: "delete",
    n: "1",
    readonly: false,
  },
  // export: { id: "export", label: i18n_actions.export1, icon: "export", n: "x" },
  // save: {
  //   id: "save",
  //   label: i18n_actions.save,
  //   icon: "save",
  //   n: "1",
  //   readonly: false,
  // },
  // views,
};

const newEntity = (m: { name: string }) =>
  i18n_actions.newEntity.replace("{0}", m.name);

export interface ViewActionsProps {
  /** Active model */
  entity: string;
  /** Active view */
  view?: string;
  /** Active record ID */
  id?: string;
}

const ViewActions = ({ entity, id }: ViewActionsProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const m = getModel(entity);
  const navigate = useNavigate();
  const isNew = id === "0";
  const deleteOne = useDeleteOne(entity);

  const confirmDelete = () => {
    setDeleteConfirmation(true);
  };

  const closeModal = () => {
    setDeleteConfirmation(false);
  };

  const onDelete = () => {
    if (id && m) {
      deleteOne.mutate(parseInt(id, 10), {
        onSuccess: () => {
          toast.success(
            i18n_actions.deleted.replace("{0}", capitalize(m.name)),
          );
          navigate(`/${evoPath}/${entity}/list`);
        },
        onError: () => {
          toast.error("Couldn't delete record.");
        },
      });
    }
    closeModal();
  };

  const buttonLink = (
    menu: MenuItem,
    idOrFun: string | (() => void),
    urlQuery = "",
  ): ReactNode =>
    typeof idOrFun === "function" ? (
      <span key={menu.icon} onClick={idOrFun}>
        <Icon name={menu.icon} tooltip={menu.label} theme="dark" />
      </span>
    ) : (
      <Link
        key={menu.icon}
        to={`/${evoPath}/${entity}/${menu.id}/${idOrFun}${urlQuery}`}
        aria-label={menu.label}
      >
        <Icon name={menu.icon} tooltip={menu.label} theme="dark" />
      </Link>
    );

  const actionIcons: ReactNode[] = [];
  if (m && !m.readOnly) {
    const label = newEntity(m);
    actionIcons.push(
      <Link to={`/${evoPath}/${entity}/edit/0`} key="new" aria-label={label}>
        <Icon name="add" tooltip={label} theme="dark" />
      </Link>,
    );
  }
  if (id && !isNew) {
    actionIcons.push(buttonLink(menuItems.del, confirmDelete));
  }

  if (m) {
    const delModal = (
      <Modal
        isOpen={deleteConfirmation}
        onClose={closeModal}
        title={i18n_msg.delete.replace("{0}", m.name)}
        width={360}
        footer={
          <>
            <Button
              onClick={closeModal}
              type="default"
              label={i18n_actions.cancel}
            />
            <Button onClick={onDelete} type="primary" label={i18n_actions.ok} />
          </>
        }
      >
        {i18n_msg.deleteConfirmation.replace("{0}", m.name)}
      </Modal>
    );

    return (
      actionIcons.length > 0 && (
        <div className="icons-context">
          {actionIcons}
          {delModal}
        </div>
      )
    );
  }

  return null;
};

export default ViewActions;
