import React, { useMemo, useState, useEffect, useRef } from "react";
import CardsGrid from "../components/Grid";
import { getAllMovies } from "../services/movies.service";
import debounce from "debounce";

const OverviewPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current) {
      loadMovies();
      isLoaded.current = true;
    }
  }, []);

  const loadMovies = () => {
    getAllMovies().then((resp) => {
      setMovies(resp);
    });
  };

  const filteredMovies = useMemo(() => {
    const txt = searchTxt.toLowerCase();
    return movies?.filter(
      (m) =>
        m.title?.toLowerCase().includes(txt) ||
        m.extract?.toLowerCase().includes(txt) ||
        m.genres?.some((g) => g.toLowerCase().includes(txt))
    );
  }, [movies, searchTxt]);

  const handleSearchChange = (e) => {
    debounce(() => {
      setSearchTxt(e.target.value);
    }, 500).apply();
  };

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
      {filteredMovies.length ? (
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
