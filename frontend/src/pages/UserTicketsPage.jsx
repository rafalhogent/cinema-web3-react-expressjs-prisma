import React, { useMemo, useState } from "react";
import Ticket from "../components/Ticket";
import TButton from "../components/TButton";
import { getUserTickets } from "../services/tickets.service";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

const UserTicketsPage = () => {
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["fetchTickets"],
    queryFn: getUserTickets,
    initialData: [],
    enabled: true,
    retry: false,
  });

  const tickets = useMemo(() => {
    const ts = data.map((d) => {
      const show = {
        ...d.showtime,
        date: DateTime.fromISO(d.showtime?.startTime).toFormat("yyyy-MM-dd"),
        time: DateTime.fromISO(d.showtime?.startTime).toLocaleString(
          DateTime.TIME_24_SIMPLE
        ),
      };
      return {
        movieTitle: show?.film?.title,
        showTime: show,
        seatNr: d.seatNr,
      };
    });
    return ts;
  }, [data]);

  return (
    <div className="p-8">
      <div>Your tickets:</div>

      <div className="m-3">
        {/* <TButton label="Confirm order" color="primary" /> */}
      </div>
      <div>
        {tickets.map((item, idx) => {
          return (
            <Ticket
              key={idx}
              seatNr={item.seatNr}
              showTime={item.showTime}
              movieTitle={item.movieTitle}
              onRemove={null}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserTicketsPage;
