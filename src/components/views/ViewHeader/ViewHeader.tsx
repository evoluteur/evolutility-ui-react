import { memo } from "react";
import Badge from "components/ui/Badge/Badge";
import ViewsNavIcons from "./ViewsNavIcons";
import FilterTags from "./FilterTags";

import "./ViewHeader.scss";

export interface ViewHeaderProps {
  /** Model id */
  entity: string;
  /** Page title */
  title?: string;
  /** Record id */
  id?: string;
  /** Active view */
  view?: string | null;
  /** Number of records (for views "many") */
  count?: string | number | null;
  /** Number of comments (for views "one") */
  comments?: number | null;
  /** Extra text beside the title */
  text?: string | null;
  /** extra parameters (filters in location search) */
  params?: string;
}

// TODO: make charts work w/ search & filters (and switch comment below)
const ViewHeader = memo(
  ({
    entity,
    title,
    id,
    view = null,
    count = null,
    comments = null,
    text = null,
    params = "",
  }: ViewHeaderProps) => {
    const search = (view === "list" || view === "cards") && (
      <FilterTags params={params} />
    );
    return (
      <div className="evo-page-header" data-testid="viewheader">
        <h1 className="page-title">
          <span className="title-txt">{title}</span>
          {count && <Badge text={count} />}
          {comments && (
            <Badge
              text={comments + comments === 1 ? " comment" : " comments"}
            />
          )}
          {search}
          {text && <span className="h-txt">{text}</span>}
        </h1>
        <div>
          <ViewsNavIcons id={id} view={view} entity={entity} params={params} />
        </div>
      </div>
    );
  },
);

export default ViewHeader;
