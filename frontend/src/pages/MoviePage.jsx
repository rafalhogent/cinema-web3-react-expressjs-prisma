import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/movies.service";
import { handleError } from "../utils/handleError";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["fetchMovie"],
    queryFn: () => getMovieById(id),
    initialData: null,
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    handleError(isError, error, navigate);
  }, [isError]);

  const movie = useMemo(() => {
    return data;
  }, [data, error]);

  if (isLoading || isFetching) {
    return <Spinner />;
  }
  return (
    <div className="m-6 2xl:mx-60">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
            <h2 className="text-base font-semibold leading-7 text-indigo-600"></h2>
            {movie?.genres?.map((genre, idx) => {
              return (
                <span
                  key={genre.id}
                  className="mr-8 text-base font-semibold leading-7 text-indigo-600"
                >
                  {genre.name}
                </span>
              );
            })}

            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {movie?.title} ({movie?.year})
            </p>

            <p className="mt-6 text-md leading-8 text-gray-600">
              {movie?.description}
            </p>
          </div>
          <h4 className="mt-5 mb-3 font-bold">cast:</h4>
          {movie?.cast?.map((a) => {
            return <div key={a.id}>{a.name}</div>;
          })}
        </div>
        <img
          src={movie?.image}
          alt="Poster"
          className=" object-cover w-80 lg:h-100"
        />
      </div>
    </div>
  );
};

export default MoviePage;
