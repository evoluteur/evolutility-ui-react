import { memo, type ReactNode } from "react";
import Icon from "components/widgets/Icon/Icon";

import "./Alert.scss";

type AlertType = "info" | "success" | "warning" | "danger";

const icons: Record<AlertType, string> = {
  info: "info",
  success: "check",
  warning: "alert",
  danger: "error",
};

const icon = (type: AlertType) => (
  <Icon name={icons[type]} size="medium" theme="none" />
);

interface AlertProps {
  /** Alert title */
  title?: string | null;
  /** Alert message */
  message: ReactNode;
  /** Alert type */
  type?: AlertType;
}

const Alert = memo(({ title = null, message, type = "danger" }: AlertProps) => (
  <div className={"alert alert-" + type} role="alert" data-testid="alert">
    <h3 className="alert-title">
      {title && icon(type)}
      <strong>{title}</strong>
    </h3>
    <div>{message}</div>
  </div>
));

export default Alert;
