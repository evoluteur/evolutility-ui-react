/* eslint-disable react-hooks/exhaustive-deps */
/*
	Evolutility-UI-React :: /views/many.tsx

	Super-class for most Views for Many (List, Cards but not Charts).

	https://github.com/evoluteur/evolutility-ui-react
	(c) 2026 Olivier Giulieri
*/

// #region ---------------- Imports ----------------
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  type MouseEvent,
} from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import { i18n_msg, i18n_errors } from "i18n/i18n";
import config from "config";
import url from "utils/url";
import { capitalize } from "utils/format";
import { getModel } from "utils/moMa";
import { useMany } from "dao/queries";
import Spinner from "components/ui/Spinner/Spinner";
import Alert from "components/ui/Alert/Alert";
import ViewHeader from "components/views/ViewHeader/ViewHeader";
import InvalidRoute from "components/views/comfort/Overview/InvalidRoute";
import ErrorBoundary from "components/ErrorBoundary";
import List from "./List/List";
import Cards from "./Cards/Cards";
import Pagination from "./shared/Pagination/Pagination";
import EmptyState from "./shared/EmptyState/EmptyState";
import type { ManyQueryOptions } from "types/api";
// #endregion

import "./Many.scss";

const { pageSize = 50 } = config;

const getRange = (pageIdx: number, pageSize: number, totalSize: number) => {
  const start = pageIdx * pageSize + 1;
  const end = pageIdx < 1 ? pageSize : start + pageSize - 1;
  return { start, end: Math.min(end, totalSize) };
};

const Many = () => {
  const { entity, view } = useParams<{ entity: string; view: string }>();
  const { search } = useLocation();
  const navigate = useNavigate();
  const model = getModel(entity);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState(model?.fields?.[0]?.id);
  const title = model?.title || capitalize(model?.namePlural);

  const query = useMemo(
    () => (url.parseQuery(search) || {}) as ManyQueryOptions,
    [search],
  );

  const { data, isPending, error } = useMany(entity as string, query);
  const rows = data && data.entity === entity ? data.rows : null;
  const paginationCount =
    data && data.entity === entity ? data.fullCount : null;

  let pageIndex = 0;
  if (paginationCount && paginationCount > pageSize) {
    pageIndex = parseInt(String(query?.page), 10) || 0;
  }

  useEffect(() => {
    document.title = title || "";
  }, [title]);

  useEffect(() => {
    if (!query.order) {
      setSortDirection("asc");
      setSortField(model?.fields?.[0]?.id);
    }
  }, [entity, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [entity, search]);

  const onClickSort = useCallback(
    (evt: MouseEvent<HTMLElement>) => {
      const fid = evt.currentTarget.id;
      let direc;
      if (sortField === fid) {
        direc = sortDirection === "asc" ? "desc" : "asc";
      } else {
        direc = "asc";
        setSortField(fid);
      }
      setSortDirection(direc);
      const newQuery: ManyQueryOptions = {
        ...query,
        order: fid + "." + direc,
        page: 0,
      };
      navigate(`../${entity}/${view}?` + url.querySearch(newQuery));
    },
    [entity, query, view, sortField, sortDirection],
  );

  const clickPagination = useCallback(
    (evt: MouseEvent<HTMLElement>) => {
      const id = evt.currentTarget.textContent;
      let pageIdx: number;
      if (id === ">" || id === "<") {
        pageIdx = parseInt(String(query.page), 10) || 0;
        if (id === "<") {
          pageIdx--;
        } else {
          pageIdx++;
        }
      } else {
        pageIdx = parseInt(id as string, 10) - 1;
      }
      const newQuery: ManyQueryOptions = { ...query };
      if (pageIdx) {
        newQuery.page = pageIdx;
      } else {
        delete newQuery.page;
      }
      navigate(`../${entity}/${view}?` + url.querySearch(newQuery));
    },
    [entity, query, view],
  );

  const pageSummary = useMemo(() => {
    const namePlural = model?.namePlural;
    const size = rows?.length || 0;
    if (size) {
      if (paginationCount === size) {
        return null;
      }
      if (size === 1) {
        return (
          `${size} ${model?.name}` +
          (paginationCount && paginationCount > size
            ? " in " + paginationCount
            : "")
        );
      } else {
        if (query) {
          if (!pageIndex && pageSize > size) {
            return (
              i18n_msg.aToBOfC // - '{0} to {1} {2}' w/ 0=mSize, 1=totalSize, 2=namePlural'
                .replace("{0}", String(size))
                .replace("{1}", String(paginationCount))
                // .replace("{2}", namePlural);
                .replace("{2}", "")
            );
          }
          const { start, end } = getRange(
            pageIndex,
            pageSize,
            paginationCount || 0,
          );
          return i18n_msg.range // - '{0} to {1} of {2} {3}' w/ 0=rangeBegin, 1=rangeEnd, 2=mSize, 3=entities'
            .replace("{0}", String(start))
            .replace("{1}", String(end))
            .replace("{2}", String(paginationCount))
            .replace("{3}", namePlural || "");
        }
        return ""; //`${totalSize} ${namePlural}`;
      }
    }
    return "";
  }, [entity, rows, search, paginationCount, pageIndex]);

  const body = () => {
    if (!model) {
      return <InvalidRoute entity={entity} />;
    }
    if (error) {
      return <Alert title={i18n_errors.error} message={error.message} />;
    }
    if (isPending || !rows) {
      return <Spinner />;
    }
    if (rows.length === 0) {
      return (
        <EmptyState model={model} hasFilters={(paginationCount || 0) > 0} />
      );
    }
    const viewProps = {
      entity: entity as string,
      model,
      data: rows,
      onClickSort,
      sortField,
      sortDirection,
    };
    return (
      <ErrorBoundary>
        {view === "list" ? <List {...viewProps} /> : <Cards {...viewProps} />}
        {!!paginationCount && paginationCount > pageSize && (
          <Pagination
            count={rows.length}
            fullCount={paginationCount || 0}
            onClick={clickPagination}
            pageIndex={pageIndex}
          />
        )}
      </ErrorBoundary>
    );
  };

  return (
    <div className={"evol-many model_" + entity}>
      {model && (
        <ViewHeader
          entity={entity as string}
          title={title}
          count={paginationCount}
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
