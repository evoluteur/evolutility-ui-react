import React, { memo } from "react";
import { Link } from "react-router-dom";
import { pixPath } from "../../../utils/format";
import { models } from "../../../utils/moMa";

import "./ModelLinks.scss";

const ModelLinks = memo(() => {
  const ms = Object.values(models)?.filter((m) => m.world !== "designer"); // && m.active
  return (
    <div className="evo-models-list">
      {ms?.map((m) => (
        <Link to={`/${m.id}/${m.defaultViewMany || "list"}`} key={m.id}>
          <img className="e-icon" src={pixPath + m.icon} alt="" />
          {m.title}
        </Link>
      ))}
    </div>
  );
});

export default ModelLinks;
