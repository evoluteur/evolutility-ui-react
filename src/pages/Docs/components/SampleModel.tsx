/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2026 Olivier Giulieri
*/

import { useState, type ChangeEvent } from "react";
import { modelsArray, getModel } from "utils/moMa";
import PrettyJSON from "./PrettyJSON";
import type { Model } from "types/model";

const calculatedProps = [
  "titleFunction", // Do not display functions
  "fieldsH",
  "_lovNoList",
  "_prepared",
  "_preparedCollecs",
];

const unPrepModel = (m: Model | null): Record<string, unknown> => {
  const m2: Record<string, unknown> = { ...m };
  calculatedProps.forEach((prop) => delete m2[prop]);
  if (!(m2.collections as unknown[] | undefined)?.length) {
    delete m2.collections;
  }
  return m2;
};

const SampleModel = () => {
  const [mid, setModel] = useState("todo");
  const m = unPrepModel(getModel(mid));
  const onSelectModel = (evt: ChangeEvent<HTMLSelectElement>) => {
    setModel(evt.currentTarget.value);
  };

  return (
    <div className="samples">
      <label>Model:</label>
      <select onChange={onSelectModel}>
        {modelsArray.map((m) => (
          <option key={m.id} value={m.id}>
            {m.title}
          </option>
        ))}
      </select>
      <PrettyJSON json={m} />
    </div>
  );
};

export default SampleModel;
