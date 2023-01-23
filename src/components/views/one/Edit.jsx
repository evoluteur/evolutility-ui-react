// Evolutility-UI-React :: /views/one/Edit.js

// View to add or update one record at a time.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

// #region ---------------- Imports ----------------
import React, { useState } from "react";
import PropTypes from "prop-types";
import modelPropType from "../modelPropTypes";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// import moment from 'moment'
import { i18n_actions, i18n_validation } from "../../../i18n/i18n";
import { fieldId2Field, fieldTypes as ft } from "../../../utils/dico";
import { validate, validateField } from "../../../utils/validation";
import List from "../many/List";
import Button from "../../widgets/Button";
import Alert from "../../widgets/Alert";
import Field from "../../field/Field";
import Panel from "../../widgets/Panel";
import Timestamps from "./Timestamps";

// #endregion

const Edit = ({ entity, model, data, onFieldChange, onSave, onCancel }) => {
  const [invalids, setInvalids] = useState(null);
  const { id = 0 } = useParams();
  const isNew = id === 0 || id === "0";
  const error = null; // TODO:

  const clickSave = () => {
    const v = validate(model, data);
    if (v.isValid) {
      setInvalids(null);
      onSave(data);
    } else {
      setInvalids(v.invalids);
      toast.error(i18n_validation.incomplete + " " + v.messages.join(" "));
    }
  };

  const fieldChange = (evt) => {
    const fid = evt.target.id;
    let v = evt.target.value;
    if (evt.target.type === "checkbox") {
      v = evt.target.checked;
    }
    if (invalids && invalids[fid]) {
      const f = model.fieldsH[fid];
      const fValidation = validateField(f, data[fid]);
      if (!fValidation) {
        let newInvalids = { ...invalids };
        delete newInvalids[fid];
        if (Object.keys(newInvalids).length === 0) {
          newInvalids = null;
        }
        setInvalids(newInvalids);
      }
    }
    onFieldChange(fid, v);
  };

  const ep = "/" + entity + "/";
  const cbs = {
    change: fieldChange,
    // dropFile: uploadFileOne,
  };
  const linkBrowse = isNew ? ep + "list" : ep + "browse" + (id ? "/" + id : "");
  const listData = (cid) => (data.collections ? data.collections[cid] : null);
  const fnField = (f) => {
    if (f) {
      if (f.type === ft.lov && !f.list) {
        // - fetch list values
        // TODO: dynamically get the LOV
        // this.getLOV(f.id);
        const dId = data[f.id];
        const dLabel = data[f.id + "_txt"];
        // TODO: too hacky, really modify model?
        f.list = [
          { id: dId, text: dLabel },
          { id: 0, text: " - Dynamic LOVs is no implemented yet -" },
        ];
      }
      const invalidMsg = invalids ? invalids[f.id] : null;
      return (
        <Field
          key={f.id}
          fieldDef={f}
          value={data[f.id]}
          data={data}
          callbacks={cbs}
          entity={entity}
          message={invalidMsg}
          invalid={!!invalidMsg}
        />
      );
    }
    return null;
  };

  const panelActions = (
    <div className="form-buttons noprint">
      <Button type="default" label={i18n_actions.cancel} url={linkBrowse} />
      <Button
        type="primary"
        onClick={clickSave}
        icon="save"
        label={i18n_actions.save}
      />
      {invalids && (
        <span className="evo-fld-invalid">{i18n_validation.incomplete}</span>
      )}
    </div>
  );

  return (
    <div className="evo-one-edit" role="form">
      {error ? (
        <Alert title="Error" message={error.message} />
      ) : (
        <div className="evol-pnls">
          {model.groups.map((g, idx) => {
            const groupFields = fieldId2Field(g.fields, model.fieldsH);
            return (
              <Panel
                key={g.id || "g" + idx}
                title={g.label || g.title || ""}
                header={g.header}
                footer={g.footer}
                width={g.width}
              >
                <div className="evol-fset">{groupFields?.map(fnField)}</div>
              </Panel>
            );
          })}
          {model.collections &&
            !isNew &&
            model.collections?.map((c, idx) => {
              const lData = listData(c.id);
              return c.hideIfEmpty && (!lData || lData.length === 0) ? null : (
                <Panel
                  key={"collec-e_" + c.id + idx}
                  title={c.title}
                  collapsible
                  header={c.header}
                  footer={c.footer}
                >
                  <List
                    isNested
                    match={this.props.match}
                    paramsCollec={c}
                    style={{ width: "100%" }}
                    data={lData}
                    location={this.props.location}
                  />
                </Panel>
              );
            })}
          {panelActions}
          <Timestamps data={data} />
        </div>
      )}
    </div>
  );
};

export default Edit;

Edit.propTypes = {
  entity: PropTypes.string.isRequired,
  model: modelPropType,
  data: PropTypes.shape({
    id: PropTypes.number,
  }),
  onFieldChange: PropTypes.func,
  onSave: PropTypes.func,
  // onCancel: PropTypes.func,
};
