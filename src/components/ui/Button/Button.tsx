import { Link } from "react-router-dom";
import Icon from "react-crud-icons";
import classnames from "classnames";

import "./Button.scss";

export interface ButtonProps {
  /** Button label */
  label: string;
  /** Button type */
  type?: "primary" | "default";
  /** Icon name from react-crud-icon */
  icon?: string;
  /** If url is specified the button uses a "a" tag */
  url?: string | null;
  /** If onClick is specified the button uses a "button" tag */
  onClick?: (() => void) | null;
  className?: string | null;
}

const Button = ({
  label,
  type = "default",
  icon,
  url = null,
  onClick = null,
  className = null,
}: ButtonProps) => {
  const css = classnames("btn btn-" + type, className || undefined);
  const content = (
    <>
      {icon && <Icon name={icon} theme="none" />}
      {label}
    </>
  );
  return onClick ? (
    <button className={css} onClick={onClick} data-testid="button">
      {content}
    </button>
  ) : (
    <Link to={url || ""} className={css} data-testid="link-test">
      {content}
    </Link>
  );
};

export default Button;
