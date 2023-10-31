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

import { i18n_actions, i18n_validation } from "../../../i18n/i18n";
import { fieldId2Field, fieldTypes as ft } from "../../../utils/dico";
import { validate, validateField } from "../../../utils/validation";
import Button from "../../widgets/Button/Button";
import Field from "../../field/Field";
import Panel from "../../widgets/Panel/Panel";
import Collection from "./Collection";
import Timestamps from "./Timestamps";
// #endregion

const Edit = ({ entity, model, data, onFieldChange, onSave, onCancel }) => {
  const [invalids, setInvalids] = useState(null);
  const { id = 0 } = useParams();
  const isNew = id === 0 || id === "0";

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

  const fieldChange = (evt, obj) => {
    // exception for Select
    const fid = evt.target ? evt.target.id : obj.name;
    const f = model.fieldsH[fid];
    let v = evt.target ? evt.target.value : { id: evt.value, name: evt.label };
    if (f.type === ft.bool) {
      v = evt.target.checked;
    }
    if (invalids && invalids[fid]) {
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

  const ep = `/${entity}/`;
  const cbs = {
    change: fieldChange,
    // dropFile: uploadFileOne,
  };
  const linkBrowse = isNew ? ep + "list" : ep + "browse" + (id ? "/" + id : "");
  const fnField = (f) => {
    if (f) {
      // if (f.type === ft.lov && !f.list) {
      //   // - fetch list values
      //   // TODO: dynamically get the LOV
      //   // this.getLOV(f.id);
      //   const dId = data[f.id];
      //   const dLabel = data[f.id + "_txt"];
      //   // TODO: too hacky, really modify model?
      //   f.list = [
      //     { id: dId, text: dLabel },
      //     { id: 0, text: " - Dynamic LOVs is no implemented yet -" },
      //   ];
      // }
      const invalidMsg = invalids ? invalids[f.id] : null;
      return (
        <Field
          key={f.id}
          fieldDef={f}
          value={data?.[f.id]}
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
        {!isNew &&
          model.collections &&
          model.collections?.map((c) => {
            const cData = data[c.id];
            return c.hideIfEmpty && (!cData || cData.length === 0) ? null : (
              <Panel
                key={c.id}
                title={c.title}
                collapsible
                header={c.header}
                footer={c.footer}
              >
                <Collection collecModel={c} collecData={cData} />
              </Panel>
            );
          })}
        {panelActions}
        <Timestamps data={data} />
      </div>
    </div>
  );
};

export default Edit;

Edit.propTypes = {
  entity: PropTypes.string.isRequired,
  model: modelPropType.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
  }),
  onFieldChange: PropTypes.func,
  onSave: PropTypes.func,
  // onCancel: PropTypes.func,
};
