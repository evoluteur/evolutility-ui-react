import { memo, type ReactElement } from "react";
import Badge from "components/ui/Badge/Badge";

import "./ViewHeader.scss";

const operators: Record<string, string> = {
  eq: "=",
  gt: ">",
  lt: "<",
};

export interface FilterTagsProps {
  /** filters and search (as in location search) */
  params?: string;
}

const FilterTags = memo(({ params = "" }: FilterTagsProps) => {
  if (!params) {
    return null;
  }
  const ps = params.slice(1).split("&");
  const filters: ReactElement[] = [];
  ps.forEach((p) => {
    const [field, cond] = p.split("=");
    if (!["order", "page", "pageSize"].includes(field)) {
      if (field === "search") {
        filters.unshift(
          <Badge key={field} text={"search=" + cond} type="success" />,
        );
      }
      const idx = cond.indexOf(".");
      if (idx > 0) {
        const op = operators[cond.substring(0, idx)] || " ";
        const v = cond.substring(idx + 1);
        // TODO: use model to get correct field label
        filters.push(<Badge key={field} text={field + op + v} type="info" />);
      }
    }
  });
  return filters.length ? filters : null;
});

export default FilterTags;
