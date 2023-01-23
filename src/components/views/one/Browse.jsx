// Evolutility-UI-React :: /views/one/Browse.js

// Read-only view to browse one record.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

// #region ---------------- Imports ----------------
import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import modelPropType from "../modelPropTypes";

import { i18n_actions } from "../../../i18n/i18n";
import { fieldId2Field } from "../../../utils/dico";

import Button from "../../widgets/Button";
import Field from "../../field/Field";
import Panel from "../../widgets/Panel";
import List from "../many/List";
import Timestamps from "./Timestamps";
// #endregion

const Browse = ({ entity, model, data }) => {
  const { id = 0 } = useParams();
  const collecData = (cid) => (data.collections ? data.collections[cid] : null);

  const fnFieldReadOnly = (f) => {
    if (f) {
      const isLOV = f.type === "lov";
      const attr = isLOV ? f.id + "_txt" : f.id;
      return (
        <Field
          key={f.id}
          fieldDef={f}
          value={data[attr]}
          valueId={isLOV ? data[f.id] : null}
          icon={isLOV ? data[f.id + "_icon"] : null}
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
        {model.collections?.map((c, idx) =>
          !collecData(c.id) || collecData(c.id).length === 0 ? null : (
            <Panel
              title={c.title}
              key={"collec-b_" + c.id + "-" + idx}
              collapsible
              header={c.header}
              footer={c.footer}
            >
              <List
                isNested
                data={collecData(c.id)}
                match={this.props.match}
                paramsCollec={c}
                style={{ width: "100%" }}
                location={this.props.location}
              />
            </Panel>
          )
        )}
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
        <Timestamps data={data} />
      </div>
    </div>
  );
};

export default Browse;

Browse.propTypes = {
  entity: PropTypes.string.isRequired,
  model: modelPropType,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};
