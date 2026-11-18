// Evolutility-UI-React
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import classnames from "classnames";
import { ToastContainer, Slide } from "react-toastify";
import config from "config";
import queryClient from "dao/queryClient";
import { evoPath } from "utils/format";

import SideBar from "components/shell/SideBar/SideBar";
import TopBar from "components/shell/TopBar/TopBar";
import Footer from "components/shell/Footer/Footer";
import ErrorBoundary from "components/ErrorBoundary";

import AuthGate from "components/shell/AuthGate/AuthGate";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import DocRoutes from "routes/DocRoutes";
import DemoRoutes from "routes/DemoRoutes";
import DesignerRoutes from "routes/DesignerRoutes";
import Alert from "components/ui/Alert/Alert";
import { i18n_errors } from "i18n/i18n";
import { modelsError, useModelsVersion } from "utils/moMa";

import "./App.scss";
import "./App-custom.scss";
import "react-toastify/ReactToastify.css";
import "rc-tooltip/assets/bootstrap_white.css";
import "components/ui/global.scss";

const baseName = config.baseName || "/";

// - login page for anonymous visitors (when the server allows them)
const LoginRoute = () => {
  const navigate = useNavigate();
  return <Login onLogin={() => navigate("/")} />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginRoute />} />
    <Route path="/docs/*" element={<DocRoutes />} />
    <Route path={`/${evoPath}/*`} element={<DemoRoutes />} />
    <Route path="/designer/*" element={<DesignerRoutes />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onClickToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const css = classnames("app", { "side-collapsed": isCollapsed });
  useModelsVersion(); // - re-render when models change (or fail to load)

  return (
    <QueryClientProvider client={queryClient}>
      <div className={css} data-testid="app">
        <BrowserRouter basename={baseName}>
          <AuthGate>
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
              {modelsError && (
                <Alert title={i18n_errors.modelsError} message={modelsError} />
              )}
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </div>
            <Footer />
          </AuthGate>
        </BrowserRouter>
        <ToastContainer autoClose={2000} transition={Slide} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
