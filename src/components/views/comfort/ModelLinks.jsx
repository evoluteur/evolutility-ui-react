import React from "react";
import { Link } from "react-router-dom";
import { models } from "../../../utils/moMa";

import "./ModelLinks.scss";

const ModelLinks = ({ view = "list" }) => {
  const ms = Object.values(models)?.filter((m) => m.world !== "designer"); // && m.active
  return (
    <div className="evo-models-list">
      {ms?.map((m) => (
        <Link to={`../${m.id}/${view}`} key={m.id}>
          <img className="e-icon" src={`/pix/${m.icon}`} alt="" />
          {m.title}
        </Link>
      ))}
    </div>
  );
};

export default ModelLinks;
