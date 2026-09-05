import Alert from "components/ui/Alert/Alert";
import Button from "components/ui/Button/Button";
import { i18n_msg as i18n } from "i18n/i18n";
import type { Model } from "types/model";

import "./EmptyState.scss";

export interface EmptyStateProps {
  model: Model;
  /** Does the user have search or filter criterias? */
  hasFilters?: boolean;
}

const EmptyState = ({ model, hasFilters = false }: EmptyStateProps) => {
  let msg = hasFilters ? i18n.noData : i18n.empty;
  msg = msg.replaceAll("{0}", model.namePlural);
  const content = (
    <>
      <div>{msg}</div>

      {hasFilters && <div className="too-much">{i18n.newCriteria}</div>}

      {!hasFilters && (
        <Button
          url={"../" + model.id + "/edit/0"}
          icon="add"
          type="primary"
          label={i18n.addTheFirst.replaceAll("{0}", model.name)}
        />
      )}
    </>
  );
  return (
    <div className="empty-state" data-testid="emptystate">
      <Alert type="info" title={i18n.noResults} message={content} />
    </div>
  );
};

export default EmptyState;
