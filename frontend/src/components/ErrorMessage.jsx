function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-state">
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
