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

import { i18n_msg, i18n_errors } from "i18n/i18n";
import config from "config";
import url from "utils/url";
import { capitalize } from "utils/format";
import { getModel } from "utils/moMa";
import { getMany } from "dao/dao";
import Spinner from "components/widgets/Spinner/Spinner";
import Alert from "components/widgets/Alert/Alert";
import ViewHeader from "components/views/ViewHeader/ViewHeader";
import InvalidRoute from "components/views/comfort/Overview/InvalidRoute";
import ErrorBoundary from "components/ErrorBoundary";
import List from "./List/List";
import Cards from "./Cards/Cards";
import Pagination from "./shared/Pagination/Pagination";
import EmptyState from "./shared/EmptyState/EmptyState";
// #endregion

import "./Many.scss";

const { pageSize = 50 } = config;

const getRange = (pageIdx, pageSize, totalSize) => {
  const start = pageIdx * pageSize + 1;
  const end = pageIdx < 1 ? pageSize : start + pageSize - 1;
  return { start, end: Math.min(end, totalSize) };
};

const Many = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [fullCount, setFullCount] = useState(null);
  const [filteredCount, setFilteredCount] = useState(null);
  const { entity, view } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const model = getModel(entity);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState(model.fields?.[0].id);
  const title = model?.title || capitalize(model?.namePlural);
  const paginationCount = filteredCount ? filteredCount : fullCount;

  const query = url.parseQuery(search) || {};
  let pageIndex = 0;
  if (data && fullCount > pageSize) {
    pageIndex = parseInt(query?.page, 10) || 0;
  }

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!query.order) {
      setSortDirection("asc");
      setSortField(model.fields?.[0].id);
    }
  }, [entity, search]);

  useEffect(() => {
    let done = false;
    setIsLoading(true);
    setError(null);
    setData(null);
    setFullCount(null);
    setFilteredCount(null);
    window.scrollTo(0, 0);
    getMany(entity, url.parseQuery(search)).then((response) => {
      if (done) {
        return;
      }
      if (response.errors) {
        setError(response.errors[0]);
      } else {
        setFullCount(response._full_count);
        if (response._filtered_count) {
          setFilteredCount(response._filtered_count);
        }
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
      const fid = evt.currentTarget.id;
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
      let link = `../${entity}/${view}`;
      link += "?" + url.querySearch(query);
      navigate(link);
    },
    [entity, search, view, sortField, sortDirection]
  );

  const clickPagination = useCallback(
    (evt) => {
      const id = evt.currentTarget.textContent;
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
      navigate(`../${entity}/${view}?` + url.querySearch(query));
    },
    [entity, search, view]
  );

  const pageSummary = useMemo(() => {
    const namePlural = model?.namePlural;
    const size = data ? data.length : 0;
    if (size) {
      if (paginationCount === size) {
        return null;
      }
      if (size === 1) {
        return (
          `${size} ${model.name}` +
          (paginationCount > size ? " in " + paginationCount : "")
        );
      } else {
        if (query) {
          if (!pageIndex && pageSize > size) {
            return (
              i18n_msg.aToBOfC // - '{0} to {1} {2}' w/ 0=mSize, 1=totalSize, 2=namePlural'
                .replace("{0}", size)
                .replace("{1}", paginationCount)
                // .replace("{2}", namePlural);
                .replace("{2}", "")
            );
          }
          const { start, end } = getRange(pageIndex, pageSize, paginationCount);
          return i18n_msg.range // - '{0} to {1} of {2} {3}' w/ 0=rangeBegin, 1=rangeEnd, 2=mSize, 3=entities'
            .replace("{0}", start)
            .replace("{1}", end)
            .replace("{2}", paginationCount)
            .replace("{3}", namePlural);
        }
        return ""; //`${totalSize} ${namePlural}`;
      }
    }
    return "";
  }, [entity, data, search, paginationCount, pageIndex]);

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
      return <Alert title={i18n_errors.error} message={error.message} />;
    }
    if (isLoading || data?._entity !== entity) {
      return <Spinner />;
    }
    if (data.length === 0) {
      return <EmptyState model={model} hasFilters={fullCount > 0} />;
    }
    return (
      <ErrorBoundary>
        {view === "list" ? <List {...viewProps} /> : <Cards {...viewProps} />}
        {paginationCount > pageSize && (
          <Pagination
            count={data.length}
            fullCount={paginationCount || 0}
            onClick={clickPagination}
            pageIndex={pageIndex}
          />
        )}
      </ErrorBoundary>
    );
  };
  const displayCount = filteredCount
    ? filteredCount + "/" + fullCount
    : fullCount;
  return (
    <div className={"evol-many model_" + entity}>
      {model && (
        <ViewHeader
          entity={entity}
          title={title}
          count={displayCount}
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
