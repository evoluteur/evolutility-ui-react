// Evolutility-UI-React :: /widget/Panel.js

// Panel to group fields in views Edit and Browse (styled w/ Bootstrap).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2021 Olivier Giulieri

import React from "react";
import PropTypes from "prop-types";
import Icon from "react-crud-icons";

import "./Panel.scss";

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: true,
    };
  }

  clickToggle = () => {
    this.setState({ opened: !this.state.opened });
  };

  render() {
    const { props } = this;
    const title = props.title ? (
      <div className="panel-heading">
        {props.collapsible ? (
          <Icon
            name={this.state.opened ? "up2" : "down2"}
            onClick={this.clickToggle}
            size="tiny"
            theme="none"
          />
        ) : null}
        <h3 className="panel-title">{props.title}</h3>
      </div>
    ) : null;

    return (
      <div className="evol-pnl" style={{ width: props.width + "%" }}>
        <div className="panel panel-default">
          {title}
          {props.header ? (
            <div className="panel-heading panel-header">{props.header}</div>
          ) : null}
          <fieldset style={{ display: this.state.opened ? "block" : "none" }}>
            {props.children}
          </fieldset>
          {props.footer ? (
            <div className="panel-footer">{props.footer}</div>
          ) : null}
        </div>
      </div>
    );
  }
}

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
