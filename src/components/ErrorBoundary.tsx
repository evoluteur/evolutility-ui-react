import type { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import Alert from "components/ui/Alert/Alert";

const fallback = (
  <Alert
    type="danger"
    title="Error"
    message={
      <>
        <p>Oops! Something went wrong.</p>
        <p>Please refresh the browser window.</p>
      </>
    }
  />
);

export interface ErrorBoundaryProps {
  children?: ReactNode;
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => (
  <ReactErrorBoundary fallback={fallback} onError={console.error}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;
