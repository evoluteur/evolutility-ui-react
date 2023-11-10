/* eslint-disable react-hooks/exhaustive-deps */
/*
	Evolutility-UI-React :: /views/many.js

	Super-class for most Views for Many (List, Cards but not Charts).

	https://github.com/evoluteur/evolutility-ui-react
	(c) 2023 Olivier Giulieri
*/

// #region ---------------- Imports ----------------
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import List from "./List/List";
import Cards from "./Cards/Cards";
import ViewHeader from "../ViewHeader/ViewHeader";
import Pagination from "../../widgets/Pagination/Pagination";
import Spinner from "../../widgets/Spinner/Spinner";
import Alert from "../../widgets/Alert/Alert";
import InvalidRoute from "../comfort/Overview/InvalidRoute";
import EmptyState from "./shared/EmptyState";
import { i18n_msg, i18n_errors } from "../../../i18n/i18n";
import config from "../../../config";
import url from "../../../utils/url";
import { getModel } from "../../../utils/moMa";
import { getMany } from "../../../dao/dao";

import "./Many.scss";
// #endregion

const { pageSize } = config;

const getRange = (pageIdx, pageSize, totalSize) => {
  const start = pageIdx * pageSize + 1;
  const end = pageIdx < 1 ? pageSize : start + pageSize - 1;
  return { start, end: Math.min(end, totalSize) };
};

const Many = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullCount, setFullCount] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState(null);

  const { entity, view } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const model = getModel(entity);
  const title = model?.title;

  let pageIndex = 0;
  if (fullCount > pageSize) {
    const query = url.parseQuery(search);
    pageIndex = parseInt(query?.page, 10) || 0;
  }

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    let done = false;
    setIsLoading(true);
    setError(null);
    setData(null);
    setFullCount(null);
    window.scrollTo(0, 0);
    getMany(entity, url.parseQuery(search)).then((response) => {
      if (done) {
        return;
      }
      if (response.errors) {
        setError(response.errors[0]);
      } else {
        setFullCount(response._full_count);
        setData(response);
      }
      setIsLoading(false);
    });
    return () => {
      done = true;
    };
  }, [entity, search]);

  const onClickSort = useCallback(
    (evt) => {
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
    },
    [entity, search, view, sortField, sortDirection]
  );

  const clickPagination = useCallback(
    (evt) => {
      const id = evt.currentTarget.textContent;
      const query = url.parseQuery(search) || {};
      let pageIdx;

      if (id === ">" || id === "<") {
        pageIdx = parseInt(query.page, 10) || 0;
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
    },
    [entity, search, view]
  );

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
          if (!pageIndex && pageSize > size) {
            return (
              i18n_msg.aToBOfC // - '{0} to {1} {2}' w/ 0=mSize, 1=totalSize, 2=namePlural'
                .replace("{0}", size)
                .replace("{1}", totalSize)
                // .replace("{2}", namePlural);
                .replace("{2}", "")
            );
          }
          const { start, end } = getRange(pageIndex, pageSize, totalSize);
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
  }, [entity, data, search, pageIndex]);

  const viewProps = {
    entity,
    model,
    data,
    onClickSort,
    sortField,
    sortDirection,
  };

  const body = () => {
    if (!model) {
      return <InvalidRoute entity={entity} />;
    }
    if (error) {
      return <Alert title={i18n_errors.serverError} message={error.message} />;
    }
    if (isLoading || data?._entity !== entity) {
      return <Spinner />;
    }
    if (data.length === 0) {
      return <EmptyState model={model} />;
    }
    return (
      <>
        {view === "list" ? <List {...viewProps} /> : <Cards {...viewProps} />}
        {fullCount > pageSize && (
          <Pagination
            count={data.length}
            fullCount={fullCount || 0}
            onClick={clickPagination}
            pageIndex={pageIndex}
          />
        )}
      </>
    );
  };

  return (
    <div className={"evol-many model_" + entity}>
      {model && (
        <ViewHeader
          entity={entity}
          title={title}
          count={fullCount}
          view={view}
          text={pageSummary}
          params={search}
        />
      )}
      {body()}
    </div>
  );
};

export default Many;
