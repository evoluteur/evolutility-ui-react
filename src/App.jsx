// Evolutility-UI-React
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import config from "config";
import { evoPath } from "utils/format";

import SideBar from "components/shell/SideBar/SideBar";
import TopBar from "components/shell/TopBar/TopBar";
import Footer from "components/shell/Footer/Footer";
import ErrorBoundary from "components/ErrorBoundary";

import Home from "pages/Home/Home";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import DocRoutes from "routes/DocRoutes";
import DemoRoutes from "routes/DemoRoutes";

import "./App.scss";
import "./App-custom.scss";
import "react-crud-icons/src/Icon.scss";
import "react-toastify/scss/main.scss";
import "rc-tooltip/assets/bootstrap_white.css";
import "components/widgets/Modal.scss";
import "components/widgets/global.scss";

const baseName = config.baseName || "/";

const AppRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/docs/*" element={<DocRoutes />} />
    <Route exact path={`/${evoPath}/*`} element={<DemoRoutes />} />
    <Route path="*" exact element={<PageNotFound />} />
  </Routes>
);

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onClickToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const css = classnames("app", { "side-collapsed": isCollapsed });

  return (
    <div className={css} data-testid="app">
      <BrowserRouter basename={baseName}>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <TopBar />
                <SideBar onClickToggle={onClickToggle} />
              </>
            }
          />
        </Routes>
        <div className="page-content" role="main">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </div>
        <Footer />
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default App;
