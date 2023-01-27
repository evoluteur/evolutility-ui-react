// Evolutility-UI-React :: /widget/Panel.js

// Panel to group fields in views Edit and Browse (styled w/ Bootstrap).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "react-crud-icons";
import classnames from "classnames";

import "./Panel.scss";

const Panel = ({
  title,
  header,
  width,
  collapsible,
  children,
  footer,
  className,
}) => {
  const [opened, setOpened] = useState(true);

  const clickToggle = () => {
    setOpened(!opened);
  };

  return (
    <div
      className={classnames("evol-pnl", className)}
      style={{ width: width + "%" }}
    >
      <div className={classnames("panel", { collapsed: !opened })}>
        {title && (
          <div className="panel-heading">
            {collapsible && (
              <Icon
                name={opened ? "chevron-up" : "chevron-down"}
                onClick={clickToggle}
                size="tiny"
                theme="none"
              />
            )}
            <h3 className="panel-title">{title}</h3>
          </div>
        )}
        {header && <div className="panel-header">{header}</div>}
        <fieldset style={{ display: opened ? "block" : "none" }}>
          {children}
        </fieldset>
        {footer && <div className="panel-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Panel;

Panel.propTypes = {
  /** Panel title */
  title: PropTypes.string,
  /** Panel width (% width of parent) */
  width: PropTypes.number,
  /** Panel can be collapsed */
  collapsible: PropTypes.bool,
  /** Panel header */
  header: PropTypes.node,
  /** Panel footer */
  footer: PropTypes.node,
  /** Panel content */
  children: PropTypes.node,
  /** Optional additional CSS class name */
  className: PropTypes.string,
};

Panel.defaultProps = {
  title: null,
  collapsible: false,
  width: 100,
  header: null,
  footer: null,
  children: null,
  className: null,
};
