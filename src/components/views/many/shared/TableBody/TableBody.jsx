import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { fieldIsNumber, fieldTypes as ft } from "utils/dico";
import { pixPath } from "utils/format";
import FieldValue from "components/Field/browse/FieldValue";
import { fieldPropTypes } from "components/views/modelPropTypes";

const TableBody = ({ fields, data, iconPath, link }) => {
  const icon = iconPath && (
    <img className="e-icon" src={pixPath + iconPath} alt="" />
  );

  const tableCell = (d, f, idx) => {
    const value = d[f.id];
    if (idx === 0) {
      // - First column is a link
      return (
        <td key={f.id}>
          <Link to={link + d.id}>
            {icon}
            {value ? (
              <FieldValue fieldDef={f} value={value} abbr={true} />
            ) : (
              `(${d.id})`
            )}
          </Link>
          {d.nb_comments && " " + d.nb_comments + " comments"}
        </td>
      );
    }
    if (f.type === ft.image) {
      return (
        <td key={f.id}>
          {value && (
            <Link to={link + d.id}>
              <FieldValue fieldDef={f} value={value} compact={true} />
            </Link>
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
    // }
    let css;
    if (fieldIsNumber(f)) {
      css = "align-right";
    } else if (f.type === ft.bool) {
      css = "td-check";
    } else if (f.type === ft.url) {
      css = "td-url";
    }
    return (
      <td className={css} key={f.id}>
        <FieldValue fieldDef={f} value={value} compact={true} />
      </td>
    );
  };

  return (
    <tbody data-testid="tbody">
      {data?.map((d) => (
        <tr key={d.id}>{fields.map((f, idx) => tableCell(d, f, idx))}</tr>
      ))}
    </tbody>
  );
};

export default TableBody;

TableBody.propTypes = {
  /** Array of field definitions */
  fields: PropTypes.arrayOf(fieldPropTypes).isRequired,
  /** Table data */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  /** Link for first column (rowid added at the end of it)  */
  link: PropTypes.string.isRequired,
  /** Path to images (image value added at the end of it) */
  iconPath: PropTypes.string.isRequired,
};
