// Evolutility-UI-React :: /views/one/Browse.js

// Read-only view to browse one record.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2021 Olivier Giulieri

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { i18n_actions, i18n_errors } from "../../../i18n/i18n";
import { dataTitle, fieldId2Field } from "../../../utils/dico";

import OneRead from "./one-read";
import Alert from "../../widgets/Alert";
import Field from "../../field/Field";
import Panel from "../../widgets/Panel";
import List from "../many/List";
import Spinner from "../../shell/Spinner";
import Header from "../../shell/Header";

export default class Browse extends OneRead {
  viewId = "browse";

  render() {
    const { id = 0, entity = null } = this.props.match.params;
    const linkEdit = `/${entity}/edit/${id}`;
    const linkList = `/${entity}/list`;
    const m = this.model;
    const data = this.state.data || {};
    const title = dataTitle(m, data, false);
    const collecData = (cid) =>
      data.collections ? data.collections[cid] : null;

    function fnFieldReadOnly(f) {
      if (f) {
        const isLOV = f.type === "lov";
        const attr = isLOV ? f.id + "_txt" : f.id;
        return (
          <Field
            key={f.id}
            model={f}
            value={data[attr]}
            valueId={isLOV ? data[f.id] : null}
            icon={isLOV ? data[f.id + "_icon"] : null}
            readOnly={true}
            entity={entity}
          />
        );
      }
      return null;
    }
    if (!m) {
      return (
        <Alert
          title="Error"
          message={i18n_errors.badEntity.replace("{0}", entity)}
        />
      );
    } else if (this.state.loading) {
      return <Spinner></Spinner>;
    } else {
      document.title = title;
      return (
        <div className="evolutility">
          <Header
            {...this.props.match.params}
            title={title}
            model={m}
            comments={data.nb_comments}
            count={null}
            cardinality="1"
            view={this.viewId}
          />

          <div className="evo-one-edit">
            {this.state.error ? (
              <Alert title="Error" message={this.state.error.message} />
            ) : (
              <div className="evol-pnls">
                {m.groups ? (
                  m.groups.map(function (g, idx) {
                    const groupFields = fieldId2Field(g.fields, m.fieldsH);
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
                  })
                ) : (
                  <Panel key="pOne" title={title}>
                    <div className="evol-fset">
                      {m.fields.map(fnFieldReadOnly)}
                    </div>
                  </Panel>
                )}

                {m.collections
                  ? m.collections.map((c, idx) => {
                      return (
                        <Panel
                          title={c.title}
                          key={"collec_" + c.id}
                          collapsible={true}
                          header={c.header}
                          footer={c.footer}
                        >
                          <List
                            key={"collec" + idx}
                            isNested={true}
                            data={collecData(c.id)}
                            match={this.props.match}
                            paramsCollec={c}
                            style={{ width: "100%" }}
                            location={this.props.location}
                          />
                        </Panel>
                      );
                    })
                  : null}

                <Panel key="formButtons">
                  <div className="evol-buttons">
                    <Link className="btn btn-default" to={linkList}>
                      <i className="glyphicon glyphicon-remove"></i>{" "}
                      {i18n_actions.cancel}
                    </Link>
                    <Link to={linkEdit} className="btn btn-primary">
                      <i className="glyphicon glyphicon-edit"></i>{" "}
                      {i18n_actions.edit}
                    </Link>
                  </div>
                </Panel>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

Browse.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object,
};
