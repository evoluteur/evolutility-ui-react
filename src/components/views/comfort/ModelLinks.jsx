import React, { memo } from "react";
import { Link } from "react-router-dom";
import { pixPath } from "utils/format";
import { modelsArray } from "utils/moMa";

import "./ModelLinks.scss";

const ModelLinks = memo(() => (
  <div className="evo-models-list">
    {modelsArray?.map((m) => (
      <div key={m.id}>
        <Link to={`../${m.id}/${m.defaultViewMany || "list"}`}>
          <img className="e-icon" src={pixPath + m.icon} alt="" />
          {m.title}
        </Link>
      </div>
    ))}
  </div>
));

export default ModelLinks;
