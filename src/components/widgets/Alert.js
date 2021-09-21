import React from "react";
import PropTypes from "prop-types";

import "./Alert.scss";

const icons = {
  info: "info-sign",
  success: "ok-sign",
  warning: "warning-sign",
  danger: "exclamation-sign", //'remove-sign'
};
function icon(name) {
  return <i className={"glyphicon glyphicon-" + icons[name]} />;
}

const Alert = ({ title, message, type }) => (
  <div className={"alert alert-" + type} role="alert">
    {title ? icon(type) : null}
    <strong>{title}</strong>
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
  type: "danger",
};
