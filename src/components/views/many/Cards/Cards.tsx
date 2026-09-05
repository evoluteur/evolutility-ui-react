/* eslint-disable react-hooks/exhaustive-deps */
// Evolutility-UI-React :: /views/many/Cards.tsx

// Cards view to display a collection as a set of Cards.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useMemo } from "react";
import { i18n_errors } from "i18n/i18n";
import Card from "components/views/one/Card";
import Alert from "components/ui/Alert/Alert";
import type { Model, RecordData } from "types/model";

import "./Cards.scss";

export interface CardsProps {
  entity: string;
  model: Model | null;
  data?: RecordData[] | null;
}

const Cards = ({ entity, model, data }: CardsProps) => {
  const fields = useMemo(() => model?.fields.filter((f) => f.inMany), [entity]);
  if (model) {
    return (
      <div data-entity={entity} className="evol-many-cards">
        <div className="evol-cards">
          {data?.map((d) => (
            <Card key={d.id} data={d} fields={fields || []} entity={entity} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <Alert
      title="Error"
      message={i18n_errors.badEntity.replace("{0}", entity)}
    />
  );
};

export default Cards;
