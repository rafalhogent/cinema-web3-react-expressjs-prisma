import React, { useMemo, useState, useEffect, useRef } from "react";
import CardsGrid from "../components/Grid";
import Spinner from "../components/Spinner";
import { getAllMovies } from "../services/movies.service";
import {handleError} from "../utils/handleError";
import debounce from "debounce";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const OverviewPage = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["fetchMovies"],
    queryFn: getAllMovies,
    initialData: [],
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    handleError(isError, error, navigate);
  }, [isError]);

  const filteredMovies = useMemo(() => {
    const txt = searchTxt.toLowerCase();
    return data?.filter(
      (m) =>
        m.title?.toLowerCase().includes(txt) ||
        m.extract?.toLowerCase().includes(txt) ||
        m.genres?.some((g) => g.toLowerCase().includes(txt))
    );
  }, [data, searchTxt]);

  const handleSearchChange = (e) => {
    debounce(() => {
      setSearchTxt(e.target.value);
    }, 500).apply();
  };

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  // handleError(isError, error, navigate);

  return (
    <div>
      <div className=" p-4 flex justify-around text-white">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-80 rounded-md border-0 py-1.5 pl-7 pr-20
             text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 
             focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="search movie"
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
      {filteredMovies?.length ? (
        <CardsGrid items={filteredMovies} />
      ) : (
        <div className="flex flex-row items-center justify-center m-10">
          no movies
        </div>
      )}
    </div>
  );
};

export default OverviewPage;
