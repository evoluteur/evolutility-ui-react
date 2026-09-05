// Evolutility-UI-React :: /views/one/Card.tsx

// Single card (usually part of a set of Cards)

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { memo } from "react";
import Icon from "components/ui/Icon/Icon";
import { Link } from "react-router-dom";
import { getModel } from "utils/moMa";
import { pixPath } from "utils/format";
import { fieldTypes as ft } from "utils/dico";
import FieldValue from "components/Field/browse/FieldValue";
import type { Field, RecordData } from "types/model";

export interface CardProps {
  /** Model id (Object unique key). */
  entity: string;
  /** List of fields metadata. */
  fields: Field[];
  /** Data (1 single record/Object). */
  data?: RecordData | null;
}

const Card = memo(({ entity, data, fields }: CardProps) => {
  const d = data || {};
  const m = getModel(entity)!;
  const linkBrowse = `../${entity}/${m.defaultViewOne || "browse"}/`;
  const linkEdit = `../${entity}/edit/`;

  return (
    <div className="panel">
      {fields?.map((f, idx) => {
        const fv = <FieldValue fieldDef={f} value={d[f.id]} />;
        if (idx === 0) {
          return (
            <div key={f.id} className="card-title">
              <h2>
                <Link to={linkBrowse + d.id}>
                  {m.icon && (
                    <img className="e-icon" src={pixPath + m.icon} alt="" />
                  )}
                  {fv || `( ${d.id} )`}
                </Link>
              </h2>
              <div className="card-actions noprint">
                <Link to={linkEdit + d.id}>
                  <Icon name="edit" size="small" />
                </Link>
              </div>
            </div>
          );
        }
        if (f.type === ft.image) {
          return (
            <div key={f.id} className="card-fld-center">
              <Link to={linkBrowse + d.id} aria-label="Browse">
                {fv}
              </Link>
            </div>
          );
        }
        const icon = f.type === ft.lov && f.lovIcon ? d[`${f.id}_icon`] : "";
        const rfid = f.id + d.id;
        return (
          <div key={f.id}>
            <label htmlFor={rfid}>{f.labelShort || f.label}: </label>
            <div id={rfid}>
              {icon && <img src={pixPath + icon} className="lov-icon" alt="" />}
              {fv}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default Card;
