// Evolutility-UI-React :: /views/many/List.js

// List view to display a collection as a list (table w/ sorting and paging).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { pageSize } from "../../../config";
import Many from "./many";
import {
  isFieldMany,
  fieldIsNumber,
  fieldTypes as ft,
} from "../../../utils/dico";
import { getSearchText } from "../../../utils/url";
import { fieldValue } from "../../../utils/format";
import Header from "../../shell/Header";
import Spinner from "../../shell/Spinner";
import NoData from "./NoData";
import Alert from "../../widgets/Alert";
import PageNotFound from "../../pages/PageNotFound";
import Pagination from "../../widgets/Pagination";

import "./List.scss";

const sliceData = (data) =>
  data.length > pageSize ? data.slice(0, pageSize) : data || [];

// TODO: search w/ pagination
export default class List extends Many {
  viewId = "list";

  lovMaps = {};

  tableHeader(fields) {
    const fnCell = this.props.paramsCollec
      ? // - header sub-collection table
        (f) => <th key={"c" + f.id}>{f.labelShort || f.label}</th>
      : // - header main table
        (f) => (
          <th
            id={f.id}
            key={f.id}
            onClick={this.clickSort}
            className={fieldIsNumber(f) ? "alignR" : ""}
          >
            {f.labelShort || f.label}
            {f.id === this._sortField ? (
              <i
                className={
                  "glyphicon glyphicon-arrow-" +
                  (this._sortDirection === "desc" ? "down" : "up")
                }
              />
            ) : null}
          </th>
        );

    return <tr>{fields.map(fnCell)}</tr>;
  }

  render() {
    const props = this.props;
    const { isNested, paramsCollec } = props;
    const e = props.match.params.entity;
    const m = this.model;
    const search = getSearchText();

    if (m || isNested) {
      const ico =
        (isNested ? paramsCollec && paramsCollec.icon : m.icon) || null;
      const icon = ico ? (
        <img className="evol-many-icon" src={"/pix/" + ico} alt="" />
      ) : null;
      const realEntity = isNested
        ? paramsCollec.object || paramsCollec.entity
        : e;
      const link =
        "/" + realEntity + "/" + ((m && m.defaultViewOne) || "browse") + "/";
      const getLovMap = this.getLovMap;

      const cell = (d, f, idx) => {
        const lovField = f.type === ft.lov;
        const value = d[lovField ? f.id + "_txt" : f.id];

        if (idx === 0) {
          // - First column is a link
          return (
            <td key={f.id}>
              <Link to={link + d.id}>
                {icon}
                {value ? fieldValue(f, value, true) : "( " + d.id + " )"}
              </Link>
              {d.nb_comments ? " " + d.nb_comments + " comments" : null}
            </td>
          );
        }
        if (f.type === ft.image) {
          return (
            <td key={f.id}>
              {value ? (
                <Link to={link + d.id}>{fieldValue(f, value, true)}</Link>
              ) : (
                ""
              )}
            </td>
          );
        }
        if (f.type === ft.color) {
          return (
            <td key={f.id}>
              <div
                className="evo-color-box"
                id={f.id}
                style={{ backgroundColor: value }}
                title={value}
              />
            </td>
          );
        }
        if (lovField) {
          if (f.lovIcon) {
            const icon = d[`${f.id}_icon`];
            if (icon) {
              return (
                <td key={f.id}>
                  <div className="nobr">
                    <img src={`/pix/${icon}`} className="lov-icon" alt="" />
                    {fieldValue(f, value, true)}
                  </div>
                </td>
              );
            } else {
              const fv = d[f.id];
              return (
                <td key={f.id}>
                  <div className="nobr">
                    {fv.icon && <img src={"/pix/" + fv.icon} alt="" />}
                    {fv.name}
                  </div>
                </td>
              );
            }
          } else {
            return (
              <td key={f.id}>
                <div className="nobr">{fieldValue(f, value, true)}</div>
              </td>
            );
          }
        } else if (f.type === ft.list) {
          const lovMap = getLovMap(f);
          return (
            <td key={f.id}>
              <div className="list-tags">
                {(value || []).map((v) => (
                  <div key={v}>{lovMap[v] || "N/A"}</div>
                ))}
              </div>
            </td>
          );
        } else if (fieldIsNumber(f)) {
          return (
            <td key={f.id} className="alignR">
              {fieldValue(f, value, true)}
            </td>
          );
        }
        return <td key={f.id}>{fieldValue(f, value, true)}</td>;
      };
      const data = isNested
          ? this.props.data || []
          : this.state.data
          ? this.state.data
          : [],
        full_count = this.pageSummary(data),
        fullCount = data._full_count || data.length,
        title = m ? m.title || m.label : "N/A",
        css = paramsCollec ? "table sub" : "table table-hover main";
      let body;
      let pagination = null;

      document.title = title;
      if (this.state.loading) {
        body = <Spinner />;
      } else if (this.state.error) {
        if (isNested) {
          body = <div className="nodata">No data.</div>;
        } else {
          body = <Alert title="Error" message={this.state.error.message} />;
        }
      } else if (data.length) {
        const fields = paramsCollec
          ? paramsCollec.fields
          : m.fields.filter(isFieldMany);

        if (!fields.length) {
          body = (
            <Alert
              title="Error"
              message="No fields are flagged as inMany to show in list."
            />
          );
        } else {
          body = (
            <table className={css}>
              <thead>{this.tableHeader(fields)}</thead>
              <tbody>
                {data.length
                  ? sliceData(data).map((d) => (
                      <tr key={d.id}>
                        {fields.map((f, idx) => cell(d, f, idx))}
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          );
          pagination = isNested ? null : (
            <Pagination
              count={data.length}
              fullCount={fullCount}
              fnClick={this.clickPagination}
              location={this.props.location}
            />
          );
        }
      } else {
        // TODO: get model of nested obj
        if (this.props.isNested) {
          body = <div className="nodata">No data.</div>;
        } else {
          body = <NoData name={m.name} namePlural={m.namePlural} />;
        }
      }
      return (
        <div data-entity={e} style={{ width: "100%" }}>
          {paramsCollec ? null : (
            <Header
              entity={e}
              title={title}
              model={m}
              count={full_count}
              cardinality="n"
              view={this.viewId}
            />
          )}
          <div className="evolutility evol-many-list">
            {body}
            {search && !this.state.loading ? null : pagination}
          </div>
        </div>
      );
    }
    return <PageNotFound location={this.props.location} />;
  }

  getLovMap = (f) => {
    let map = this.lovMaps[f.id];
    if (!map && f.list) {
      map = {};
      f.list.forEach((item) => (map[item.id] = item.text));
      this.lovMaps[f.id] = map;
    }
    return map;
  };
}

List.propTypes = {
  params: PropTypes.shape({
    entity: PropTypes.string.isRequired,
  }),
  paramsCollec: PropTypes.object,
  isNested: PropTypes.bool,
  data: PropTypes.any,
};

List.defaultProps = {
  isNested: false,
};
