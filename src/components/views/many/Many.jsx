/* eslint-disable react-hooks/exhaustive-deps */
/*
	Evolutility-UI-React :: /views/many.js

	Super-class for most Views for Many (List, Cards but not Charts).

	https://github.com/evoluteur/evolutility-ui-react
	(c) 2023 Olivier Giulieri
*/

// #region ---------------- Imports ----------------
import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import List from "./List";
import Cards from "./Cards";

import PageTitle from "../../shell/PageTitle";
import Pagination from "../../widgets/Pagination";
import Spinner from "../../widgets/Spinner";
import Alert from "../../widgets/Alert";
import EmptyState from "./EmptyState";
import { i18n_msg, i18n_errors } from "../../../i18n/i18n";
import config from "../../../config";
import url from "../../../utils/url";
import { getModel } from "../../../utils/moMa";
import dao from "../../../utils/dao";

import "./Many.scss";
// #endregion

const { pageSize } = config;

const getRange = (pageIdx, pageSize, totalSize) => {
  const start = pageIdx * pageSize + 1;
  const end = pageIdx < 1 ? pageSize : start + pageSize - 1;
  return { start, end: Math.min(end, totalSize) };
};

const Many = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fullCount, setFullCount] = useState(null);
  const [error, setError] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState(null);

  const { entity, view } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const model = getModel(entity);
  const title = model?.title;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    let done = false;
    setError(null);
    const getData = (entity) => {
      const query = url.parseQuery(search);
      setLoading(true);
      dao.getMany(entity, query).then((response) => {
        if (done) {
          return;
        }
        if (response.errors) {
          setError(response.errors[0]);
        }
        setFullCount(response._full_count);
        setData(response.data || response);
        setLoading(false);
      });
    };
    window.scrollTo(0, 0);
    getData(entity);

    return () => {
      done = true;
    };
  }, [entity, search]);

  const clickSort = (evt) => {
    const fid = evt.currentTarget.id,
      query = url.parseQuery(search) || {};

    let direc;
    if (sortField === fid) {
      direc = sortDirection === "asc" ? "desc" : "asc";
    } else {
      direc = "asc";
      setSortField(fid);
    }
    setSortDirection(direc);
    query.order = fid + "." + direc;
    query.page = 0;
    let link = `/${entity}/${view}`;
    if (query) {
      link += "?" + url.querySearch(query);
    }
    navigate(link);
  };

  const clickPagination = (evt) => {
    const id = evt.currentTarget.textContent;
    const query = url.parseQuery(search) || {};
    let pageIdx;

    if (id === ">" || id === "<") {
      pageIdx = query.page || 0;
      if (id === "<") {
        pageIdx--;
      } else {
        pageIdx++;
      }
    } else {
      pageIdx = parseInt(id, 10) - 1;
    }
    if (query && query.page && !pageIdx) {
      delete query.page;
    } else {
      query.page = pageIdx;
    }
    navigate(`/${entity}/${view}?` + url.querySearch(query));
  };

  const pageSummary = useMemo(() => {
    const namePlural = model?.namePlural;
    const size = data ? data.length : 0;
    if (size) {
      const totalSize = data._full_count;
      if (totalSize === size) {
        return null;
      }
      if (size === 1) {
        return (
          `${size} ${model.name}` + (totalSize > size ? " in " + totalSize : "")
        );
      } else {
        const query = url.parseQuery(search);
        if (query) {
          const pageIdx = query.page || 0;
          if (!pageIdx && pageSize > size) {
            return (
              i18n_msg.aToBOfC // - '{0} to {1} {2}' w/ 0=mSize, 1=totalSize, 2=namePlural'
                .replace("{0}", size)
                .replace("{1}", totalSize)
                // .replace("{2}", namePlural);
                .replace("{2}", "")
            );
          }
          const { start, end } = getRange(pageIdx, pageSize, totalSize);
          return i18n_msg.range // - '{0} to {1} of {2} {3}' w/ 0=rangeBegin, 1=rangeEnd, 2=mSize, 3=entities'
            .replace("{0}", start)
            .replace("{1}", end)
            .replace("{2}", totalSize)
            .replace("{3}", namePlural);
        }
        return ""; //`${totalSize} ${namePlural}`;
      }
    }
    return "";
  }, [data, search]);

  const viewProps = {
    entity,
    model,
    data,
    onClickSort: clickSort,
    sortField,
    sortDirection,
  };

  let body;
  if (!model) {
    body = (
      <Alert
        title={i18n_errors.error}
        message={i18n_errors.badEntity.replace("{0}", entity)}
      />
    );
  } else if (loading) {
    body = <Spinner />;
  } else if (error) {
    body = <Alert title={i18n_errors.serverError} message={error.message} />;
  } else if (data.length === 0) {
    body = <EmptyState model={model} />;
  } else {
    body = (
      <>
        {view === "list" ? <List {...viewProps} /> : <Cards {...viewProps} />}
        {fullCount > 0 && (
          <Pagination
            count={data.length}
            fullCount={fullCount || 0}
            onClick={clickPagination}
          />
        )}
      </>
    );
  }

  return (
    <div className={"evol-many model_" + entity}>
      <PageTitle
        entity={entity}
        title={title}
        model={model}
        count={fullCount}
        cardinality="n"
        view={view}
        text={pageSummary}
      />
      {body}
    </div>
  );
};

export default Many;

Many.propTypes = {
  isNested: PropTypes.bool,
};

Many.defaultProps = {
  isNested: false,
};
