import React from "react";
import { Link } from "react-router-dom";
import { isObject } from "underscore";
import { fieldTypes as ft } from "../../utils/dico";
import { fieldValue, image, pixPath } from "../../utils/format";
import config from "../../config";

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

const itemInList = (id, list) => {
  const tag = list.find((item) => item.id === id);
  if (tag) {
    return tag.text;
  }
  return "N/A";
};

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

const fieldElemReadOnly = (f, d, icon) => {
  // - return the formatted field value
  let fw;

  if (f.type === ft.textml) {
    const height = `${emHeight(f)}em`;
    return (
      <div
        className="disabled evo-rdonly scroll-y"
        style={{ height }}
        dangerouslySetInnerHTML={createMarkup(d)}
      />
    );
  }
  if (f.type === ft.image && d) {
    fw = image(filesUrl + d);
  } else if (f.type === ft.doc) {
    fw = doc(d, filesUrl);
  } else if (f.type === ft.lov) {
    if (f.object) {
      fw = <Link to={`/${f.object}/browse/${d?.id}`}>{fieldValue(f, d)}</Link>;
    } else if (f.lovIcon && icon) {
      fw = (
        <span>
          <img src={pixPath + icon} className="lov-icon" alt="" />
          {fieldValue(f, d)}
          {d?.name}
        </span>
      );
    } else {
      fw = fieldValue(f, d);
    }
  } else if (f.type === ft.list) {
    if (f.list) {
      fw = (
        <div key={`${f.id}_list`} className="list-tags">
          {(d || []).map((itemid) => (
            <div key={itemid}>{itemInList(itemid, f.list)}</div>
          ))}
        </div>
      );
    } else {
      fw = fieldValue(f, d);
    }
  } else if (f.type === ft.json) {
    fw = <pre>{isObject(d) ? JSON.stringify(d, null, 2) : d || ""}</pre>;
  } else {
    fw = fieldValue(f, d);
  }
  return <div className="disabled evo-rdonly">{fw}</div>;
};

export default fieldElemReadOnly;
