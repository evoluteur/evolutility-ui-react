/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2023 Olivier Giulieri
*/

import React, { useState } from "react";
import PrettyJSON from "./PrettyJSON";
import { modelIds, getModel } from "../../../utils/moMa";

const calculatedProps = [
  "titleFunction",
  "fieldsH",
  "_prepared",
  "_preparedCollecs",
];

const unPrepModel = (m) => {
  const m2 = { ...m };
  calculatedProps.forEach((prop) => delete m2[prop]);
  if (!m2.collections?.length) {
    delete m2.collections;
  }
  if (m2.qid === m2.id) {
    delete m2.qid;
  }
  return m2;
};

const SampleModel = () => {
  const [mid, setModel] = useState("todo");
  const m = unPrepModel(getModel(mid));
  const onSelectModel = (evt) => {
    setModel(evt.currentTarget.value);
  };

  return (
    <div className="samples">
      <label>Model:</label>
      <select onChange={onSelectModel}>
        {modelIds.map((mid) => (
          <option key={mid} value={mid}>
            {mid}
          </option>
        ))}
      </select>
      <PrettyJSON json={m} />
    </div>
  );
};

export default SampleModel;
