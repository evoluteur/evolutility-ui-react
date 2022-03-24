// Evolutility-UI-React :: /widget/Pagination.js

// Pagination for List and Cards views (styled w/ Bootstrap).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import React from "react";
import PropTypes from "prop-types";

import queryString from "query-string";

import { pageSize } from "../../config";

import "./Pagination.scss";

export default class Pagination extends React.PureComponent {
  _paginationBody() {
    let pIdx;
    const totalSize = this.props.fullCount;
    const size = this.props.count;
    const query = queryString.parse(this.props.location.search); // this.props.location.query

    if (query) {
      // if(query.page==='p--' || query.page==='p++'){
      // }
      pIdx = parseInt(query.page || "0", 10);
    } else {
      pIdx = 0;
    }
    const h = [];
    let gapIdx = 0;

    if (totalSize > size && !(pIdx === 0 && size < pageSize)) {
      const fnClick = this.props.fnClick;
      const nbPages = Math.ceil(totalSize / pageSize);
      const wPrev = pIdx > 0;
      const wNext = nbPages > pIdx + 1;
      const pId = pIdx + 1;
      const bPage = function (id) {
        h.push(
          <li key={id} className={pId === id ? "active" : ""} onClick={fnClick}>
            <span className="fakeLink">{id}</span>
          </li>
        );
      };
      const bPageRange = function (pStart, pEnd) {
        for (let i = pStart; i <= pEnd; i++) {
          bPage(i);
        }
      };
      const bGap = function (idx) {
        h.push(
          <li key={"gap" + idx} className="disabled">
            <span className="fakeLink">...</span>
          </li>
        );
      };

      h.push(
        <li
          key="prev"
          className={wPrev ? "" : "disabled"}
          onClick={wPrev ? fnClick : null}
        >
          <span className="fakeLink">&laquo;</span>
        </li>
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

      h.push(
        <li
          key="next"
          className={wNext ? "" : "disabled"}
          onClick={wNext ? fnClick : null}
        >
          <span className="fakeLink">&raquo;</span>
        </li>
      );
    }
    return h;
  }

  render() {
    return this.props.fullCount > pageSize ? (
      <nav className="clearer">
        <ul className="pagination">{this._paginationBody()}</ul>
      </nav>
    ) : null;
  }
}

Pagination.propTypes = {
  pageIdx: PropTypes.number,
  count: PropTypes.number.isRequired,
  fullCount: PropTypes.number.isRequired,
  location: PropTypes.object,
  fnClick: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  pageIdx: 0,
};
