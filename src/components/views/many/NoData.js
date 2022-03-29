import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "react-crud-icons";

import Alert from "../../widgets/Alert";
import { i18n_msg } from "../../../i18n/i18n";

import "./NoData.scss";

const NoData = ({ model }) => (
  <div className="no-data">
    <Alert
      type="info"
      title="No data"
      message={i18n_msg.nodata.replaceAll("{0}", model.namePlural)}
    />
    <Link to="edit/0">
      <Icon name="add" theme="light" />
      <span>{i18n_msg.addTheFirst.replaceAll("{0}", model.name)}</span>
    </Link>
  </div>
);

export default NoData;

NoData.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    namePlural: PropTypes.string.isRequired,
  }).isRequired,
};
