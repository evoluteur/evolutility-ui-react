// Evolutility-UI-React :: /views/one/Browse.js

// Read-only view to browse one record.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

// #region ---------------- Imports ----------------
import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import modelPropType from "../../modelPropTypes";

import { i18n_actions } from "../../../../i18n/i18n";
import { fieldId2Field } from "../../../../utils/dico";

import Button from "../../../widgets/Button/Button";
import Field from "../../../Field/Field";
import Panel from "../../../widgets/Panel/Panel";
import Collection from "../shared/Collection/Collection";
import Timestamps from "../shared/Timestamps/Timestamps";
// #endregion

import "../shared/Form.scss";

const Browse = ({ entity, model, data }) => {
  const { id = 0 } = useParams();

  const fnFieldReadOnly = (f) => {
    if (f) {
      return (
        <Field
          key={f.id}
          fieldDef={f}
          value={data?.[f.id]}
          readOnly
          entity={entity}
        />
      );
    }
    return null;
  };

  return (
    <div className="evo-one-browse">
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
              <div className="evol-fset">
                {groupFields.map(fnFieldReadOnly)}
              </div>
            </Panel>
          );
        })}
        {model.collections?.map((c) => {
          const cData = data[c.id];
          return (
            cData &&
            cData.length > 0 && (
              <Panel
                key={c.id || c.object}
                title={c.title}
                collapsible
                header={c.header}
                footer={c.footer}
              >
                <Collection collecModel={c} collecData={cData} />
              </Panel>
            )
          );
        })}
        <div className="form-buttons noprint">
          <Button
            url={`/${entity}/list`}
            type="default"
            label={i18n_actions.cancel}
          />
          <Button
            icon="edit"
            url={`/${entity}/edit/${id}`}
            type="primary"
            label={i18n_actions.edit}
          />
        </div>
        <Timestamps created={data.created_at} updated={data.updated_at} />
      </div>
    </div>
  );
};

export default Browse;

Browse.propTypes = {
  entity: PropTypes.string.isRequired,
  model: modelPropType.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};
