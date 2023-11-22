import React, { memo } from "react";
import PropTypes from "prop-types";
import config from "config";

import "./Pagination.scss";

const { pageSize = 50 } = config;

const Pagination = memo(({ count, fullCount, pageIndex, onClick }) => {
  if (fullCount > pageSize) {
    let gapIdx = 0;
    const paginationBody = [];

    if (fullCount > count && !(pageIndex === 0 && count < pageSize)) {
      const nbPages = Math.ceil(fullCount / pageSize);
      const wPrev = pageIndex > 0;
      const wNext = nbPages > pageIndex + 1;
      const pId = pageIndex + 1;
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
      <nav className="evo-pagination" data-testid="pagination">
        {paginationBody}
      </nav>
    );
  }
  return null;
});

export default Pagination;

Pagination.propTypes = {
  /** Page index (default 0) */
  pageIndex: PropTypes.number,
  /** Number of records in the page */
  count: PropTypes.number.isRequired,
  /** Total number of records */
  fullCount: PropTypes.number.isRequired,
  /** Callback function for pagination click */
  onClick: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  pageIndex: 0,
};
