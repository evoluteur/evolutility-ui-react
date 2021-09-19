import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "react-crud-icons";

import Alert from "../../widgets/Alert";
import { i18n_msg } from "../../../i18n/i18n";

import "./NoData.scss";

export default class NoData extends React.PureComponent {
  render() {
    return (
      <div className="no-data">
        <Alert
          type="info"
          title="No data"
          message={i18n_msg.nodata.replace("{0}", this.props.namePlural)}
        />
        <Link to={"edit/0"}>
          <Icon name="add" theme="light" />
          <span>{i18n_msg.addTheFirst.replace("{0}", this.props.name)}</span>
        </Link>
      </div>
    );
  }
}

NoData.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    namePlural: PropTypes.string.isRequired,
  }),
};
