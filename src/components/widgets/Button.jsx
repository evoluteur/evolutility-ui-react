import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon, { keys } from "react-crud-icons";
import classnames from "classnames";

import "./Button.scss";

const Button = ({ label, type, icon, url, onClick, className }) => {
  const css = classnames("btn btn-" + type, className);
  const content = (
    <>
      {icon && <Icon name={icon} theme="none" />}
      {label}
    </>
  );
  return onClick ? (
    <button className={css} onClick={onClick}>
      {content}
    </button>
  ) : (
    <Link to={url} className={css}>
      {content}
    </Link>
  );
};

export default Button;

Button.propTypes = {
  /** Button label */
  label: PropTypes.string.isRequired,
  /** Button type */
  type: PropTypes.oneOf(["primary", "default"]),
  /** Icon name from react-crud-icon */
  icon: PropTypes.oneOf(keys),
  /** If url is specified the button uses a "a" tag */
  url: PropTypes.string,
  /** If onClick is specified the button uses a "button" tag */
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "default",
  icon: null,
  url: null,
  onClick: null,
  className: null,
};
