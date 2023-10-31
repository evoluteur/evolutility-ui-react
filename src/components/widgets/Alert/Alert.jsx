import React from "react";
import PropTypes from "prop-types";
import Icon from "react-crud-icons";

import "./Alert.scss";

const icons = {
  info: "info",
  success: "check",
  warning: "alert",
  danger: "error",
};

const icon = (name) => <Icon name={icons[name]} size="medium" theme="none" />;

const Alert = ({ title, message, type }) => (
  <div className={"alert alert-" + type} role="alert" data-testid="alert-test">
    <h3 className="alert-title">
      {title && icon(type)}
      <strong>{title}</strong>
    </h3>
    <p>{message}</p>
  </div>
);

export default Alert;

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "info", // - blue
    "success", // - green
    "warning", // - yellow
    "danger", // - red
  ]),
};

Alert.defaultProps = {
  title: null,
  type: "danger",
};
