import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import Alert from "components/widgets/Alert/Alert";

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

const ErrorBoundary = ({ children }) => (
  <ReactErrorBoundary fallback={fallback} onError={console.error}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;
