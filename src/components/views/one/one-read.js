// Evolutility-UI-React :: One-read

// Super-class used in Views for One (Browse, Edit but not Card) to get data by ID.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import React from "react";
import dao, { isGraphQL } from "../../../utils/dao";
// import { withRouter, browserHistory } from 'react-router'

import { i18n_errors } from "../../../i18n/i18n";
import { apiPath } from "../../../config";
import { getModel } from "../../../utils/moMa";

import "./one.scss";

export default class OneRead extends React.Component {
  viewSuperType = "1"; // = one

  state = {
    data:
      (this.props.match.params.id === "0") & this.getDefaultData
        ? this.getDefaultData()
        : {},
    loading: true,
    invalid: false,
  };

  UNSAFE_componentWillMount() {
    this.setModel();
  }

  getData(entity, nid) {
    const e = entity || this.props.match.params.entity;
    const id = nid || this.props.match.params.id;
    let newState = {
      data: {},
      loading: false,
      invalid: false,
    };
    if (this._validated && this.clearValidation && this.viewId !== "browse") {
      this.clearValidation();
    }
    if (id && id !== "0") {
      this.setState({
        loading: true,
      });
      const qUrl = apiPath + e + "/" + id;
      this.lastQuery = qUrl;

      dao
        .getOne(e, id)
        .then((data) => {
          if (isGraphQL && data.errors) {
            // TODO: show better msg or all errors?
            newState.error = {
              message: data.errors[0].message,
            };
            this.setState(newState);
          }
          if (this.lastQuery === qUrl) {
            if (data !== null && data !== "") {
              this.emptyDelta(false);
              newState.data = data;
            } else {
              newState.info = i18n_errors.badId.replace("{0}", id);
            }
            this.lastQuery = null;
            this.setState(newState);
          } else {
            console.log("Navigated before response: " + qUrl);
          }
        })
        .catch((err) => {
          newState.error = {
            message: err.message || i18n_errors.badId.replace("{0}", id),
          };
          this.setState(newState);
        });
    } else if (id === "0") {
      this.emptyDelta(true);
      newState.data = this.getDefaultData();
      this.setState(newState);
    }
  }

  componentDidMount() {
    const props = this.props;
    // - set hook to confirm navigation (on leave if dirty data)
    if (props.router) {
      props.router.setRouteLeaveHook(props.route, this.routerWillLeave);
    }
    window.scrollTo(0, 0);
    // - get data or if new then clear data
    if (this.props.match.params.id && this.props.match.params.id !== "0") {
      this.getData();
    } else {
      this.emptyDelta(true);
      this.setState({
        data:
          this.props.match.params.id === "0" && this.getDefaultData
            ? this.getDefaultData()
            : {},
        invalid: false,
      });
    }
  }

  componentWillUnmount() {
    this.done = true;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params &&
      (nextProps.match.params.entity !== this.props.match.params.entity ||
        nextProps.match.params.id !== this.props.match.params.id)
    ) {
      this.setModel(nextProps.match.params.entity);
      // TODO: alternative to isMounted
      if (!this.done) {
        // if(this.isMounted()){
        const isNew = nextProps.match.params.id === "0";
        this.emptyDelta(isNew);
        this.setState({
          data: isNew ? this.getDefaultData() : {},
          invalid: false,
        });
        if (!isNew) {
          this.getData(
            nextProps.match.params.entity,
            nextProps.match.params.id
          );
        }
      }
    }
  }

  setModel(entity) {
    this.model = getModel(entity || this.props.match.params.entity);
  }

  emptyDelta(useDefault) {
    this._dirty = false;
    this.delta = useDefault && this.getDefaultData ? this.getDefaultData() : {};
  }
}
