import { Link } from "react-router-dom";
import Icon from "components/widgets/Icon/Icon";
import { getModel } from "utils/moMa";
import { views, modelViewsAnalytics, type ViewInfo } from "utils/dicoViews";

export interface ViewsNavIconsProps {
  /** Model id */
  entity: string;
  /** Active view */
  view?: string | null;
  /** Record id */
  id?: string | null;
  // Extra parameters (url search)
  params?: string;
}

const ViewsNavIcons = ({
  id = null,
  view = null,
  entity,
  params = "",
}: ViewsNavIconsProps) => {
  let iconViews: ViewInfo[] = [];
  if (view === "overview" || view === "activity") {
    return null;
  }
  if (view === "edit" || view === "browse") {
    if (!id || id === "0") {
      return null;
    } else {
      iconViews = [views.edit, views.browse];
    }
  } else if (view === "stats" || view === "charts") {
    const model = getModel(entity);
    iconViews = modelViewsAnalytics(model);
    // } else if (view === "list" || view === "cards") {
  } else {
    iconViews = [views.list, views.cards];
  }

  const urlFrag = (id ? "/" + id : "") + params;
  const iconLink = (ico: ViewInfo) => (
    <Link
      key={ico.id}
      to={`../${entity}/${ico.id}${urlFrag}`}
      aria-label={ico.label}
      className={view === ico.id ? "active" : ico.id}
    >
      <Icon name={ico.icon || ico.id} tooltip={ico.label} theme="light" />
    </Link>
  );

  return <div className="title-icons">{iconViews?.map(iconLink)}</div>;
};

export default ViewsNavIcons;
