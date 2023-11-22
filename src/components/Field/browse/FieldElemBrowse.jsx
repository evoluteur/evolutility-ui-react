import React, { memo } from "react";
import { Link } from "react-router-dom";
import { fieldTypes as ft } from "utils/dico";
import { image, pixPath, jsonString } from "utils/format";
import FieldValue from "./FieldValue";
import config from "config";

const { filesUrl } = config;

const emHeight = (f) => {
  let fh = parseInt(f.height || 2, 10);
  if (fh < 2) {
    fh = 2;
  }
  return Math.trunc(fh * 1.6);
};

const createMarkup = (d) => ({
  __html: d
    ? d.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")
    : "",
});

// const itemInList = (id, list) => {
//   const tag = list.find((item) => item.id === id);
//   if (tag) {
//     return tag.text;
//   }
//   return "N/A";
// };

const doc = (d, path) => {
  if (!d) {
    return null;
  }
  return (
    <a href={encodeURI(path + d)} target="_blank" rel="noopener noreferrer">
      {d}
    </a>
  );
};

const FieldElemBrowse = memo(({ fieldDef, value, icon }) => {
  // - return the formatted field value
  const f = fieldDef;
  const fType = f.type;
  let fw;

  if (fType === ft.textml) {
    const height = `${emHeight(f)}em`;
    return (
      <div
        className="disabled evo-rdonly scroll-y"
        style={{ height }}
        dangerouslySetInnerHTML={createMarkup(value)}
      />
    );
  }
  if (fType === ft.image && value) {
    fw = image(filesUrl + value);
  } else if (fType === ft.doc) {
    fw = doc(value, filesUrl);
  } else if (fType === ft.lov) {
    if (f.object) {
      fw = (
        <Link to={`/${f.object}/browse/${value?.id}`}>
          <FieldValue fieldDef={f} value={value} />
        </Link>
      );
    } else if (f.lovIcon && icon) {
      fw = (
        <span>
          <img src={pixPath + icon} className="lov-icon" alt="" />
          <FieldValue fieldDef={f} value={value} />
          {value?.name}
        </span>
      );
      // } else if (fType === ft.list) {
      // if (f.list) {
      //   fw = (
      //     <div key={`${f.id}_list`} className="list-tags">
      //       {value?.map((itemid) => (
      //         <div key={itemid}>{itemInList(itemid, f.list)}</div>
      //       ))}
      //     </div>
      //   );
      // }
    } else {
      fw = <FieldValue fieldDef={f} value={value} />;
    }
  } else if (fType === ft.json) {
    fw = <pre>{jsonString(value)}</pre>;
  } else {
    fw = <FieldValue fieldDef={f} value={value} />;
  }
  return <div className="disabled evo-rdonly">{fw}</div>;
});

export default FieldElemBrowse;
