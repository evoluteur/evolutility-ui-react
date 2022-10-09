// Evolutility-UI-React :: /widget/Panel.js

// Panel to group fields in views Edit and Browse (styled w/ Bootstrap).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "react-crud-icons";

import "./Panel.scss";

const Panel = ({ title, header, width, collapsible, children, footer }) => {
  const [opened, setOpened] = useState(true);

  const clickToggle = () => {
    setOpened(!opened);
  };

  const titleElem = title ? (
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
  ) : null;

  return (
    <div className="evol-pnl" style={{ width: width + "%" }}>
      <div className="panel panel-default">
        {titleElem}
        {header && <div className="panel-heading panel-header">{header}</div>}
        <fieldset style={{ display: opened ? "block" : "none" }}>
          {children}
        </fieldset>
        {footer ? <div className="panel-footer">{footer}</div> : null}
      </div>
    </div>
  );
};

export default Panel;

Panel.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  collapsible: PropTypes.bool,
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
};

Panel.defaultProps = {
  title: null,
  collapsible: false,
  width: 100,
  header: null,
  footer: null,
  children: null,
};
