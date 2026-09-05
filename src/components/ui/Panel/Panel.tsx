// Evolutility-UI-React :: /ui/Panel.tsx

// Panel to group fields in views Edit and Browse (styled w/ Bootstrap).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useState, type ReactNode } from "react";
import Icon from "components/ui/Icon/Icon";
import classnames from "classnames";

import "./Panel.scss";

export interface PanelProps {
  /** Panel title */
  title?: string | null;
  /** Panel width (% width of parent) */
  width?: number;
  /** Panel can be collapsed */
  collapsible?: boolean;
  /** Panel header */
  header?: ReactNode;
  /** Panel footer */
  footer?: ReactNode;
  /** Panel content */
  children?: ReactNode;
  /** Optional additional CSS class name */
  className?: string | null;
}

const Panel = ({
  title = null,
  header = null,
  width = 100,
  collapsible = false,
  children = null,
  footer = null,
  className = null,
}: PanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const clickToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={classnames("evol-pnl", className || undefined)}
      style={{ width: width + "%" }}
      role="group"
      data-testid="panel"
    >
      <div className={classnames("panel", { collapsed: isCollapsed })}>
        {title && (
          <div className="panel-heading">
            {collapsible && (
              <Icon
                name={isCollapsed ? "chevron-down" : "chevron-up"}
                onClick={clickToggle}
                size="tiny"
                theme="none"
              />
            )}
            <h2 className="panel-title">{title}</h2>
          </div>
        )}
        {header && <div className="panel-header">{header}</div>}
        {children}
        {footer && <div className="panel-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Panel;
