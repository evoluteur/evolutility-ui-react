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

import { capitalize } from "../../../utils/format";
import dao from "../../../utils/dao";
import views from "../../../utils/dicoViews";
import { i18n_msg, i18n_actions } from "../../../i18n/i18n";
import { getModel } from "../../../utils/moMa";
import Button from "../../widgets/Button/Button";

import "./ViewActions.scss";

const menuItems = {
  // new: {id: 'edit/0', label: i18n_actions.new, icon:'add', n:'x', readonly:false},
  del: {
    id: "del",
    label: i18n_actions.delete1,
    icon: "delete",
    n: "1",
    readonly: false,
  },
  export: { id: "export", label: i18n_actions.export1, icon: "export", n: "x" },
  save: {
    id: "save",
    label: i18n_actions.save,
    icon: "save",
    n: "1",
    readonly: false,
  },
  views,
};

const isFunction = (x) => typeof x === "function";

const Toolbar = ({ entity, id, view }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const navigate = useNavigate();
  const ep = `/${entity}/`;
  const isNew = id === "0" || id === 0;
  const actions = [];

  const confirmDelete = () => {
    setDeleteConfirmation(true);
  };

  const closeModal = () => {
    setDeleteConfirmation(false);
  };

  const deleteOne = () => {
    const m = getModel(entity);

    if (entity && id && m) {
      dao
        .deleteOne(entity, parseInt(id, 10)) // TODO: move parseInt higher
        .then((response) => {
          if (response.errors) {
            const errorMsg = "Couldn't delete record.";
            toast.error(errorMsg);
          } else {
            toast.success(
              i18n_actions.deleted.replace("{0}", capitalize(m.name))
            );
            navigate("/" + entity + "/list");
          }
        })
        .catch(() => {
          const errorMsg = "Couldn't delete record.";
          toast.error(errorMsg);
          // this.setState({
          //   error: {
          //     message: errorMsg,
          //   },
          // });
        });
    }
    closeModal();
  };

  const buttonLink = (menu, idOrFun, urlQuery = "") =>
    isFunction(idOrFun) ? (
      <span key={menu.icon} onClick={idOrFun}>
        <Icon name={menu.icon} tooltip={menu.label} theme="dark" />{" "}
      </span>
    ) : (
      <Link key={menu.icon} to={ep + menu.id + "/" + idOrFun + urlQuery}>
        <Icon name={menu.icon} tooltip={menu.label} theme="dark" />{" "}
      </Link>
    );

  if (id && !isNew) {
    actions.push(buttonLink(menuItems.del, confirmDelete));
  }

  const m = getModel(entity);
  if (m) {
    const item = document.getElementById("itemTitle");
    const itemName = item ? item.innerHTML : "";
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
              {i18n_msg.deleteConfirmation
                .replace("{0}", m.name)
                .replace("{1}", itemName)}
            </div>
            <div className="modal-footer">
              <Button
                onClick={closeModal}
                type="default"
                label={i18n_actions.cancel}
              />
              <Button
                onClick={deleteOne}
                type="primary"
                label={i18n_actions.ok}
              />
            </div>
          </div>
        </div>
      </Modal>
    );

    return (
      <div className="evo-toolbar" role="toolbar">
        <div className="evo-nav-pills">{actions}</div>
        <div className="clearfix" />
        {delModal}
      </div>
    );
  }

  return null;
};

Toolbar.propTypes = {
  /** Active model */
  entity: PropTypes.string.isRequired,
  /** Active view */
  view: PropTypes.string,
  /** Active record ID */
  id: PropTypes.string,
};

export default Toolbar;
