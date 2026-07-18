import { i18n_nav } from "i18n/i18n";

import "./Spinner.scss";

// Credits: HTML & CSS from http://tobiasahlin.com/spinkit/

export interface SpinnerProps {
  message?: string;
}

const Spinner = ({ message = i18n_nav.loading }: SpinnerProps) => (
  <div className="evol-loading" role="alert" data-testid="spinner">
    <div className="loading_txt">{message}</div>
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  </div>
);

export default Spinner;
