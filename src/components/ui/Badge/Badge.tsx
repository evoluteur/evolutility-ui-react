import "./Badge.scss";
import "components/ui/Alert/Alert.scss";

export interface BadgeProps {
  /** Badge text */
  text: string | number;
  /** Badge type */
  type?: "default" | "info" | "success" | "warning" | "danger";
}

const Badge = ({ text, type = "default" }: BadgeProps) => (
  <div className={`evo-badge alert-${type}`} role="status" data-testid="badge">
    <span>{text}</span>
  </div>
);

export default Badge;
