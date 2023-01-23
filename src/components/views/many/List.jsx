// Evolutility-UI-React :: /views/many/List.js

// List view to display a collection as a list (table w/ sorting and paging).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

// #region ---------------- Imports ----------------
import React from "react";
import PropTypes from "prop-types";
import modelPropType from "../modelPropTypes";
import { Link } from "react-router-dom";
import Icon from "react-crud-icons";
import config from "../../../config";
import { fieldIsNumber, fieldTypes as ft } from "../../../utils/dico";
import { fieldValue } from "../../../utils/format";
import Alert from "../../widgets/Alert";

import "./List.scss";
// #endregion

const { pageSize } = config;
const sliceData = (data) =>
  data.length > pageSize ? data.slice(0, pageSize) : data || [];

// TODO: search w/ pagination
const List = ({
  entity,
  model,
  isNested,
  data,
  sortField,
  sortDirection,
  onClickSort,
}) => {
  // lovMaps = {};
  // getLovMap = (f) => {
  //   let map = this.lovMaps[f.id];
  //   if (!map && f.list) {
  //     map = {};
  //     f.list.forEach((item) => (map[item.id] = item.text));
  //     this.lovMaps[f.id] = map;
  //   }
  //   return map;
  // };
  const fnCell = (f) => (
    <th id={f.id} key={f.id} onClick={onClickSort}>
      {f.labelShort || f.label}
      {f.id === sortField && (
        <Icon theme="none" name={sortDirection === "desc" ? "down" : "up"} />
      )}
    </th>
  );
  const tableHeader = (fields) => {
    // const fnCell = this.props.paramsCollec
    //   ? // - header sub-collection table
    //     (f) => <th key={"c" + f.id}>{f.labelShort || f.label}</th>
    //   : // - header main table
    return <tr>{fields.map(fnCell)}</tr>;
  };

  //   const { isNested, paramsCollec } = props;
  //   const search = getSearchText();
  //   if (m || isNested) {
  //     const ico =
  //       (isNested ? paramsCollec && paramsCollec.icon : m.icon) || null;
  //     const icon = ico ? (
  //       <img className="e-icon" src={"/pix/" + ico} alt="" />
  //     ) : null;
  const icon = model?.icon && (
    <img className="e-icon" src={"/pix/" + model.icon} alt="" />
  );
  //     const realEntity = isNested
  //       ? paramsCollec.object || paramsCollec.entity
  //       : e;
  const link = "/" + entity + "/" + model?.defaultViewOne + "/";

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
          console.log(f);
          const fv = d[f.id];
          return (
            <td key={f.id}>
              <div className="nobr">
                {fv && fv?.icon && <img src={"/pix/" + fv?.icon} alt="" />}
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
      // } else if (f.type === ft.list) {
      //   const lovMap = getLovMap(f);
      //   return (
      //     <td key={f.id}>
      //       <div className="list-tags">
      //         {(value || []).map((v) => (
      //           <div key={v}>{lovMap[v] || "N/A"}</div>
      //         ))}
      //       </div>
      //     </td>
      //   );
    } else if (fieldIsNumber(f)) {
      return (
        <td key={f.id} className="align-right">
          {fieldValue(f, value, true)}
        </td>
      );
    } else if (f.type === ft.bool) {
      return (
        <td key={f.id} className="td-check">
          {fieldValue(f, value, true)}
        </td>
      );
    }
    return <td key={f.id}>{fieldValue(f, value, true)}</td>;
  };
  const css = isNested ? "table sub" : "table table-hover main";
  let body;
  //       if (isNested) {
  //         body = <div className="nodata">No data.</div>;
  //       } else {
  //         body = <Alert title="Error" message={this.state.error.message} />;
  //       }
  //     } else if (data.length) {
  //       const fields = paramsCollec
  //         ? paramsCollec.fields
  //         : m.fields.filter((f) => f.inMany);

  const fields = model.fields.filter((f) => f.inMany);
  if (!fields.length) {
    body = (
      <Alert
        title="Error"
        message="No fields are flagged as inMany to show in list."
      />
    );
  } else if (data?.length) {
    body = (
      <table className={css}>
        <thead>{tableHeader(fields)}</thead>
        <tbody>
          {data.length &&
            sliceData(data).map((d) => (
              <tr key={d.id}>{fields.map((f, idx) => cell(d, f, idx))}</tr>
            ))}
        </tbody>
      </table>
    );
  }
  return (
    <div data-entity={entity} className="evol-many-list">
      {body}
    </div>
  );
};

export default List;

List.propTypes = {
  entity: PropTypes.string.isRequired,
  model: modelPropType,
  /** Indicates that the list instance is nested in a form (as a collection). */
  isNested: PropTypes.bool,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
    PropTypes.shape({
      errors: PropTypes.arrayOf(PropTypes.shape()),
    }),
  ]),
  onClickSort: PropTypes.func.isRequired,
};

List.defaultProps = {
  isNested: false,
};
