// Evolutility-UI-React :: /views/many/Cards.js

// Cards view to display a collection as a set of Cards.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2021 Olivier Giulieri

import React from "react";
import PropTypes from "prop-types";

import { i18n_errors } from "../../../i18n/i18n";
import Header from "../../shell/Header";
import { isFieldMany } from "../../../utils/dico";
import Many from "./many";
import Card from "../one/Card";
import Alert from "../../widgets/Alert";
import Pagination from "../../widgets/Pagination";
import Spinner from "../../shell/Spinner";
import NoData from "./NoData";

import "./Cards.scss";

export default class Cards extends Many {
  viewId = "cards";

  render() {
    const entity = this.props.match.params.entity;
    const m = this.model;

    if (m) {
      const data = this.state.data ? this.state.data : [];
      const full_count = this.pageSummary(data);
      const fullCount = data._full_count
        ? data._full_count
        : data.length
        ? data[0]._full_count || 0
        : 0;
      const title = m.title || m.label;
      let body;

      document.title = title;
      if (this.state.loading) {
        body = <Spinner />;
      } else if (this.state.error) {
        body = <Alert title="Error" message={this.state.error.message} />;
      } else if (data.length) {
        const fieldCols = m.fields.filter(isFieldMany);
        body = (
          <>
            <div className="evol-cards-body">
              {this.state.data.map((d, idx) => (
                <Card key={idx} data={d} fields={fieldCols} entity={entity} />
              ))}
              <span className="clearer" />
            </div>
            <Pagination
              count={data.length}
              fullCount={fullCount}
              fnClick={this.clickPagination}
              location={this.props.location}
            />
          </>
        );
      } else {
        body = <NoData name={m.name} namePlural={m.namePlural} />;
      }
      return (
        <div data-entity={entity} className="evol-many-cards">
          <Header
            model={m}
            entity={entity}
            title={title}
            count={full_count}
            cardinality="n"
            view={this.viewId}
          />
          {body}
        </div>
      );
    }
    return (
      <Alert
        title="Error"
        message={i18n_errors.badEntity.replace("{0}", entity)}
      />
    );
  }
}

Cards.propTypes = {
  params: PropTypes.shape({
    entity: PropTypes.string.isRequired,
  }),
};
