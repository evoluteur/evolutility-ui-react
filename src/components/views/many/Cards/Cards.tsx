/* eslint-disable react-hooks/exhaustive-deps */
// Evolutility-UI-React :: /views/many/Cards.tsx

// Cards view to display a collection as a set of Cards.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { i18n_actions, i18n_errors, i18n_msg } from "i18n/i18n";
import { capitalize } from "utils/format";
import { useDeleteOne } from "dao/queries";
import Card from "components/views/one/Card";
import Alert from "components/ui/Alert/Alert";
import Modal from "components/ui/Modal/Modal";
import Button from "components/ui/Button/Button";
import type { Model, RecordData } from "types/model";

import "./Cards.scss";

export interface CardsProps {
  entity: string;
  model: Model | null;
  data?: RecordData[] | null;
}

// - record title for messages (ex: "Car wash")
const recordTitle = (m: Model, d: RecordData): string => {
  if (m.titleFunction) {
    return m.titleFunction({ ...d });
  }
  const v = d[m.titleField || m.fields[0]?.id];
  return String((v && typeof v === "object" ? v.name : v) ?? d.id);
};

const Cards = ({ entity, model, data }: CardsProps) => {
  const fields = useMemo(() => model?.fields.filter((f) => f.inMany), [entity]);
  // - record waiting for delete confirmation
  const [toDelete, setToDelete] = useState<RecordData | null>(null);
  const deleteOne = useDeleteOne(entity);
  const onDelete = useCallback((d: RecordData) => setToDelete(d), []);
  const closeModal = () => setToDelete(null);

  if (!model) {
    return (
      <Alert
        title="Error"
        message={i18n_errors.badEntity.replace("{0}", entity)}
      />
    );
  }

  const confirmDelete = () => {
    if (toDelete?.id) {
      const title = recordTitle(model, toDelete);
      deleteOne.mutate(toDelete.id, {
        onSuccess: () =>
          toast.success(
            i18n_msg.deleted
              .replace("{0}", capitalize(model.name))
              .replace("{1}", title),
          ),
        onError: () => toast.error(i18n_errors.badDelete.replace("{0}", title)),
      });
    }
    closeModal();
  };

  return (
    <div data-entity={entity} className="evol-many-cards">
      <div className="evol-cards">
        {data?.map((d) => (
          <Card
            key={d.id}
            data={d}
            fields={fields || []}
            entity={entity}
            onDelete={onDelete}
          />
        ))}
      </div>
      <Modal
        isOpen={!!toDelete}
        onClose={closeModal}
        title={i18n_msg.delete.replace(
          "{0}",
          toDelete ? recordTitle(model, toDelete) : model.name,
        )}
        width={360}
        footer={
          <>
            <Button
              onClick={closeModal}
              type="default"
              label={i18n_actions.cancel}
            />
            <Button
              onClick={confirmDelete}
              type="primary"
              label={i18n_actions.ok}
            />
          </>
        }
      >
        {i18n_msg.deleteConfirmation.replace("{0}", model.name)}
      </Modal>
    </div>
  );
};

export default Cards;
