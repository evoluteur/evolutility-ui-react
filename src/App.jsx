// Evolutility-UI-React
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import config from "./config";

import SideBar from "./components/shell/SideBar/SideBar";
import TopBar from "./components/shell/TopBar/TopBar";
import Footer from "./components/shell/Footer/Footer";
import ErrorBoundary from "./components/widgets/ErrorBoundary";

import Home from "./pages/Home/Home";
import Demos from "./pages/Demos/Demos";
import DocsRoutes from "./pages/Docs/DocsRoutes";
import EvolRoutes from "./components/EvolRoutes";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import "./App.scss";
import "./App-custom.scss";
import "react-toastify/scss/main.scss";
import "react-crud-icons/src/Icon.scss";

const baseName = config.baseName || "/";

const AppRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/docs/*" element={<DocsRoutes />} />
    <Route exact path="/demos" element={<Demos />} />
    <Route path="*" element={<EvolRoutes />} />
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
