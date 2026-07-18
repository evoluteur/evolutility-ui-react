import { useState, type MouseEvent, type ReactNode } from "react";

import "./PrettyJSON.scss";

export interface PrettyJSONProps {
  json: unknown;
}

const PrettyJSON = ({ json }: PrettyJSONProps) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const onClick = (evt: MouseEvent<HTMLElement>) => {
    const key = evt.currentTarget.id;
    const nCollapsed = { ...collapsed };
    nCollapsed[key] = !nCollapsed[key];
    setCollapsed(nCollapsed);
  };
  const collapse = (key: string) => {
    const isOpen = !collapsed[key];
    const css = "icoco " + (isOpen ? "right" : "up");
    return (
      <div className={css} onClick={onClick} id={key}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </div>
    );
  };
  let k = 0;
  const jValue = (v: unknown): ReactNode => {
    k++;
    if (v === null) {
      return (
        <span key={"nu" + k} className="null">
          null
        </span>
      );
    }
    if (Array.isArray(v)) {
      const key = "a" + k;
      return (
        <span key={key}>
          {collapse(key)}[
          {collapsed[key] ? (
            <span id={key} onClick={onClick} className="dots">
              ...
            </span>
          ) : (
            <div className="tab">
              {v.map((vv, idx) => (
                <span key={idx}>
                  {jValue(vv)},<br />
                </span>
              ))}
            </div>
          )}
          ]
        </span>
      );
    }
    if (typeof v === "object") {
      const key = "o" + k;
      const obj = v as Record<string, unknown>;
      return (
        <span key={key} className="obj">
          {collapse(key)}
          {"{"}
          {collapsed[key] ? (
            <span id={key} onClick={onClick} className="dots">
              ...
            </span>
          ) : (
            Object.keys(obj).map((ok, idx) => (
              <div key={idx} className="tab">
                <span className="key">{ok}</span>: {jValue(obj[ok])},
              </div>
            ))
          )}
          {"}"}
        </span>
      );
    }
    if (typeof v === "string") {
      return (
        <span key={"s" + k} className="string">
          "{v}"
        </span>
      );
    }
    if (Number.isInteger(v)) {
      return (
        <span key={"n" + k} className="num">
          {v as number}
        </span>
      );
    }
    if (v === true || v === false) {
      return (
        <span key={"b" + k} className="bool">
          {v.toString()}
        </span>
      );
    }
    if (typeof v === "function") {
      return (
        <span key={"f" + k} className="func">
          {v.toString()}
        </span>
      );
    }
    return null;
  };

  return <div className="pretty-json">{jValue(json)}</div>;
};

export default PrettyJSON;
