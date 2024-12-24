import React from 'react';
import {ErrorBoundary as ReactErrorBoundary} from 'react-error-boundary';

type ErrorFallbackProps = {
    error: Error;
    resetErrorBoundary: () => void;
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({error, resetErrorBoundary}) => (
    <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
    </div>
);

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({children}) => (
    <ReactErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error) => console.error('Logged Error:', error)}
    >
        {children}
    </ReactErrorBoundary>
);

export default ErrorBoundary;