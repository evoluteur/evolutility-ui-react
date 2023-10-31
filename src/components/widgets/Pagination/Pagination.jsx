import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import config from "../../../config";

import "./Pagination.scss";

const { pageSize } = config;

const Pagination = ({ count, fullCount, onClick }) => {
  const { search } = useLocation();
  if (fullCount > pageSize) {
    const query = search ? queryString.parse(search) : null;
    let pIdx = query ? parseInt(query.page || "0", 10) : 0;
    let gapIdx = 0;
    const paginationBody = [];

    if (fullCount > count && !(pIdx === 0 && count < pageSize)) {
      const nbPages = Math.ceil(fullCount / pageSize);
      const wPrev = pIdx > 0;
      const wNext = nbPages > pIdx + 1;
      const pId = pIdx + 1;
      const bPage = (id) => {
        paginationBody.push(
          <div
            key={id}
            className={pId === id ? "active" : ""}
            onClick={onClick}
          >
            <span>{id}</span>
          </div>
        );
      };
      const bPageRange = (pStart, pEnd) => {
        for (let i = pStart; i <= pEnd; i++) {
          bPage(i);
        }
      };
      const bGap = (idx) => {
        paginationBody.push(
          <div key={"gap" + idx} className="disabled">
            <span>...</span>
          </div>
        );
      };

      paginationBody.push(
        <div
          key="prev"
          className={wPrev ? "" : "disabled w-border"}
          onClick={wPrev ? onClick : null}
        >
          <span>&lt;</span>
        </div>
      );
      bPage(1);

      if (nbPages < 17) {
        bPageRange(2, nbPages);
      } else if (pId < 5) {
        bPageRange(2, 5);
        if (nbPages > 5) {
          bGap(gapIdx++);
          bPage(nbPages);
        }
      } else {
        bGap(gapIdx++);
        bPageRange(pId - 2, Math.min(pId + 2, nbPages));
        if (nbPages > pId + 2) {
          if (nbPages > pId + 3) {
            bGap(gapIdx++);
          }
          bPage(nbPages);
        }
      }

      paginationBody.push(
        <div
          key="next"
          className={wNext ? "" : "disabled w-border"}
          onClick={wNext ? onClick : null}
        >
          <span>&gt;</span>
        </div>
      );
    }

    return (
      fullCount > pageSize && (
        <nav className="evo-pagination">{paginationBody}</nav>
      )
    );
  }
  return null;
};

export default Pagination;

Pagination.propTypes = {
  /** Page index (default 0) */
  pageIdx: PropTypes.number,
  /** Number of records in the page */
  count: PropTypes.number.isRequired,
  /** Total number of records */
  fullCount: PropTypes.number.isRequired,
  /** Callback function for pagination click */
  onClick: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  pageIdx: 0,
};
