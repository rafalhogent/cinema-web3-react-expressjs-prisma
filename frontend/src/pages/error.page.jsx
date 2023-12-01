import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <p>{error.status}</p>
      <p>{error.statusText}</p>
    </div>
  );
};

export default ErrorPage;