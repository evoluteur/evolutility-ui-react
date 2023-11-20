// Evolutility-UI-React :: toolbar.js

// Toolbar w/ icons for CRUD, export, and charts.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Icon from "react-crud-icons";
import { isFunction } from "underscore";
import { evoPath, capitalize } from "../../../utils/format";
import { deleteOne } from "../../../dao/dao";
import { i18n_msg, i18n_actions } from "../../../i18n/i18n";
import { getModel } from "../../../utils/moMa";
import Button from "../../widgets/Button/Button";

const menuItems = {
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

const newEntity = (m) => i18n_actions.newEntity.replace("{0}", m.name);

const ViewActions = ({ entity, id }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const m = getModel(entity);
  const navigate = useNavigate();
  const isNew = id === "0" || id === 0;

  const confirmDelete = () => {
    setDeleteConfirmation(true);
  };

  const closeModal = () => {
    setDeleteConfirmation(false);
  };

  const onDelete = () => {
    if (id && m) {
      deleteOne(entity, parseInt(id, 10)) // TODO: move parseInt higher
        .then((response) => {
          if (response.errors) {
            const errorMsg = "Couldn't delete record.";
            toast.error(errorMsg);
          } else {
            toast.success(
              i18n_actions.deleted.replace("{0}", capitalize(m.name))
            );
            navigate(`/${evoPath}/${entity}/list`);
          }
        });
    }
    closeModal();
  };

  const buttonLink = (menu, idOrFun, urlQuery = "") =>
    isFunction(idOrFun) ? (
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

  const actionIcons = [];
  if (!m.readOnly) {
    const label = newEntity(m);
    actionIcons.push(
      <Link to={`/${evoPath}/${entity}/edit/0`} key="new" aria-label={label}>
        <Icon name="add" tooltip={label} theme="dark" />
      </Link>
    );
  }
  if (id && !isNew) {
    actionIcons.push(buttonLink(menuItems.del, confirmDelete));
  }

  if (m) {
    const delModal = deleteConfirmation && (
      <Modal
        className="modal-dialog"
        ariaHideApp={false}
        isOpen={deleteConfirmation}
        onRequestClose={closeModal}
        style={{
          content: {
            position: "absolute",
            top: "20%",
            left: "calc(50% - 150px)",
            width: "360px",
          },
        }}
      >
        <div>
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={closeModal}
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
              <h4 className="modal-title">
                {i18n_msg.delete.replace("{0}", m.name)}
              </h4>
            </div>
            <div className="modal-body">
              {i18n_msg.deleteConfirmation.replace("{0}", m.name)}
            </div>
            <div className="modal-footer">
              <Button
                onClick={closeModal}
                type="default"
                label={i18n_actions.cancel}
              />
              <Button
                onClick={onDelete}
                type="primary"
                label={i18n_actions.ok}
              />
            </div>
          </div>
        </div>
      </Modal>
    );

    return (
      actionIcons.length && (
        <div className="icons-context">
          {actionIcons}
          {delModal}
        </div>
      )
    );
  }

  return null;
};

ViewActions.propTypes = {
  /** Active model */
  entity: PropTypes.string.isRequired,
  /** Active view */
  view: PropTypes.string,
  /** Active record ID */
  id: PropTypes.string,
};

export default ViewActions;
