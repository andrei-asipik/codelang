import { isObject } from '@utils/helpers';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

type ErrorResponseDataType = {
  message: string;
};

const isErrorResponseData = (data: unknown): data is ErrorResponseDataType =>
  isObject(data) && 'message' in data;

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {isErrorResponseData(error.data) && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <div>Oops!</div>;
  }
};
