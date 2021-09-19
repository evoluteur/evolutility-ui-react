import React from "react";
import PropTypes from "prop-types";
import { i18n_msg } from "../../i18n/i18n";

import "./Spinner.scss";

// HTML & CSS from http://tobiasahlin.com/spinkit/

const Spinner = ({ message }) => (
  <div className="evol-loading">
    <div className="loading_txt">{message || i18n_msg.loading}</div>
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  </div>
);

export default Spinner;

Spinner.propTypes = {
  message: PropTypes.string,
};

Spinner.defaultProps = {
  message: null,
};
