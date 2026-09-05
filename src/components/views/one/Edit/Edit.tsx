/* eslint-disable react-hooks/exhaustive-deps */
// Evolutility-UI-React :: /views/one/Edit.tsx

// View to add or update one record at a time.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

// #region ---------------- Imports ----------------
import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { i18n_actions, i18n_validation } from "i18n/i18n";
import { fieldId2Field, fieldTypes as ft } from "utils/dico";
import { validate, validateField } from "utils/validation";
import Button from "components/ui/Button/Button";
import Field from "components/Field/Field";
import Panel from "components/ui/Panel/Panel";
import Collection from "../shared/Collection/Collection";
import Timestamps from "../shared/Timestamps/Timestamps";
import type {
  Field as FieldDef,
  FieldChangeArg,
  Model,
  RecordData,
} from "types/model";
// #endregion

import "../shared/Form.scss";

export interface EditProps {
  entity: string;
  model: Model;
  data: RecordData;
  onFieldChange: (fid: string, value: unknown) => void;
  onSave: (data: RecordData) => void;
}

const Edit = ({ entity, model, data, onFieldChange, onSave }: EditProps) => {
  const [invalids, setInvalids] = useState<Record<string, string> | null>(null);
  const { id = 0 } = useParams<{ id: string }>();
  const isNew = id === 0 || id === "0";

  const clickSave = useCallback(() => {
    const v = validate(model, data);
    if (v.isValid) {
      setInvalids(null);
      onSave(data);
    } else {
      setInvalids(v.invalids);
      toast.error(i18n_validation.incomplete + " " + v.messages.join(" "));
    }
  }, [entity, data, onSave]);

  const fieldChange = useCallback(
    (evt: FieldChangeArg, obj?: { name: string }) => {
      const fid =
        "target" in evt ? evt.target.id : (obj as { name: string }).name;
      const f = model.fieldsH[fid];
      let v: unknown;
      if (f.type === ft.bool) {
        v = "target" in evt ? evt.target.checked : undefined;
      } else if (f.type === ft.lov) {
        if (f.object) {
          const { value, label } = evt as {
            value: string | number;
            label?: unknown;
          };
          v = { id: value, name: label };
        } else {
          v = { id: "target" in evt ? evt.target.value : undefined };
        }
      } else {
        v = "target" in evt ? evt.target.value : undefined;
      }
      if (invalids && invalids[fid]) {
        const fValidation = validateField(f, v);
        if (!fValidation) {
          const newInvalids: Record<string, string> = { ...invalids };
          delete newInvalids[fid];
          setInvalids(
            Object.keys(newInvalids).length === 0 ? null : newInvalids,
          );
        }
      }
      onFieldChange(fid, v);
    },
    [entity, invalids, onFieldChange, model],
  );

  const linkCancel = `../${entity}/${isNew ? "list" : "browse/" + id}`;
  const fnField = (f: FieldDef | undefined) => {
    if (f) {
      const invalidMsg = invalids ? invalids[f.id] : null;
      return (
        <Field
          key={f.id}
          fieldDef={f}
          label={f.labelEdit || f.label}
          value={data?.[f.id]}
          onChange={fieldChange}
          message={invalidMsg}
          invalid={!!invalidMsg}
        />
      );
    }
    return null;
  };

  const panelActionButtons = (
    <div className="form-buttons noprint">
      <Button type="default" label={i18n_actions.cancel} url={linkCancel} />
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
        {model.groups?.map((g, idx) => {
          const groupFields = fieldId2Field(g.fields, model.fieldsH);
          return (
            <Panel
              key={g.id || "g" + idx}
              title={g.label || g.title}
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
                key={c.id || c.object}
                title={c.title}
                collapsible
                header={c.header}
                footer={c.footer}
              >
                <Collection collecModel={c} collecData={cData} />
              </Panel>
            );
          })}
        {panelActionButtons}
        {!isNew && (
          <Timestamps created={data.created_at} updated={data.updated_at} />
        )}
      </div>
    </div>
  );
};

export default Edit;
