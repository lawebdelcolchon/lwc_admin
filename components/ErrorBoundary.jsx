import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const FallbackComponent = () => (
  <h1>Algo salió mal.</h1>
);

const ErrorBoundary = ({ children }) => {

  const onError = (error, errorInfo) => {
    console.log("Error capturado:", error.message);
    if (error.message.includes("ResizeObserver loop completed with undelivered notifications")) {
      console.log("ResizeObserver error capturado:", error.message);
    }
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
