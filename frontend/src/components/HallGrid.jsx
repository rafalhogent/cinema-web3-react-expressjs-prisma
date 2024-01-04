import React, { useEffect, useMemo } from "react";
import Seat from "./Seat";

const HallGrid = ({ hall = null, onSeatsChange, selectedSeats = [] }) => {
  
  useEffect(() => {
    onSeatsChange([]);
  }, [hall]);

  const toggleSeat = (nr) => {
    let arr = [...selectedSeats];
    const foundNr = selectedSeats.find((s) => s === nr);
    if (!foundNr) {
      arr.push(nr);
    } else {
      arr = selectedSeats.filter((s) => s != nr);
    }
    onSeatsChange(arr);
  };

  const seats = useMemo(() => {
    if (hall) {
      const seats = [];
      for (let nr = 1; nr <= hall.capacity; nr++) {
        seats.push(nr);
      }
      return seats;
    }
  }, [hall]);

  const checkSeat = (nr) => {
    return selectedSeats?.includes(nr);
  };

  return (
    <div className="m-4 grid grid-cols-10 gap-2 lg:gap-4 bg-gray-100 p-2">
      {seats?.map((nr) => {
        return (
          <Seat
            key={nr}
            nr={nr}
            clickAction={toggleSeat}
            selected={checkSeat(nr)}
          />
        );
      })}
    </div>
  );
};

export default HallGrid;
