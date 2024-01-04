import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/movies.service";
import { handleError } from "../utils/handleError";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { DateTime } from "luxon";
import _ from "lodash";
import TSelector from "../components/TSelector";
import HallGrid from "../components/HallGrid";

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setDate] = useState(null);
  const [selectedTime, setTime] = useState(null);
  const [selectedHall, setHall] = useState(null);
  const [seats, setSeats] = useState([]);

  //#region handlers
  const handleDateSelection = (value) => {
    setDate(value);
  };
  const handleTimeSelection = (value) => {
    setTime(value);
  };
  const handleHallSelection = (value) => {
    setHall(value);
  };
  const handleSeatsChange = (value) => {
    setSeats(value);
  };
  //#endregion

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

  //#region computed memo's
  const movie = useMemo(() => {
    return data;
  }, [data, error]);

  const showtimes = useMemo(() => {
    return _.orderBy(movie?.showtimes, (x) => x.startTime).map((sh) => {
      return {
        ...sh,
        date: DateTime.fromISO(sh.startTime).toFormat("yyyy-MM-dd"),
        time: DateTime.fromISO(sh.startTime).toLocaleString(
          DateTime.TIME_24_SIMPLE
        ),
      };
    });
  }, [movie]);

  const dates = useMemo(() => {
    const ord = _.orderBy(showtimes, ["startTime"]);
    const dts = ord.map((od) => od.date);
    const uq = _.uniq(dts);
    return uq.map((d, i) => {
      return {
        id: i,
        value: d,
      };
    });
  }, [showtimes]);

  const times = useMemo(() => {
    if (!selectedDate?.value) return [];
    const filterd = showtimes
      ?.filter((x) => x.date === selectedDate?.value)
      .map((w) => w.time);
    return _.uniq(filterd).map((t, i) => {
      return {
        id: i,
        value: t,
      };
    });
  }, [dates, showtimes, selectedDate]);

  const halls = useMemo(() => {
    if (!selectedTime?.value) return [];
    const filterd = showtimes
      ?.filter(
        (x) => x.date === selectedDate?.value && x.time === selectedTime?.value
      )
      .map((w) => w.hall);
    return _.uniq(filterd);
  }, [dates, showtimes, selectedDate, selectedTime]);

  const myShowtime = useMemo(() => {
    return showtimes.find((x) => {
      return (
        x.date == selectedDate?.value &&
        x.time == selectedTime?.value &&
        x.hall.id === selectedHall?.id
      );
    });
  }, [selectedDate, selectedTime, selectedHall]);
  //#endregion

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

      <div className="sm:mt-24">
        <h3 className="my-3 text-xl font-semibold "> Showtimes </h3>

        <TSelector
          collection={dates}
          title="Date:"
          clickAction={(obj) => handleDateSelection(obj)}
        />

        <TSelector
          collection={times}
          title="Time:"
          color="secondary"
          clickAction={(obj) => handleTimeSelection(obj)}
        />

        <TSelector
          collection={halls}
          title="Hall:"
          valueField="name"
          color="danger"
          clickAction={(obj) => handleHallSelection(obj)}
        />
      </div>

      <div className="my-4">
        <h2>ticket</h2>
        <p>
          {myShowtime?.date} {myShowtime?.time} {myShowtime?.hall.name}
        </p>
      </div>

      <h3 className="text-lg">selected seats: {seats?.join(", ")}</h3>
      <HallGrid hall={selectedHall} onSeatsChange={(e) => handleSeatsChange(e)} selectedSeats={seats}/>

    </div>
  );
};

export default MoviePage;
