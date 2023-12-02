import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-indigo-600">{error.status}</h2>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{error.statusText}</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, something went wrong.</p>
          <div className="mt-5">
            <a className="mt-4 text-lg bg-slate-700 text-white p-3" href="/">Go to the main page</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;