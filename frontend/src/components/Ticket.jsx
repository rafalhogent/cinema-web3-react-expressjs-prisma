import React from "react";
import TButton from "./TButton";

const Ticket = ({ seatNr, showTime, movieTitle, onRemove }) => {
  return showTime ? (
    <div className="m-6 border-2 inline-block p-6">
      <div>
        <h4 className="sm:text-lg ">ticket:</h4>
        <div>Title: {movieTitle}</div>
        <div>date: {showTime.date}</div>
        <div>time: {showTime.time}</div>
        <div>
          Hall nr: {showTime.hall?.id} - {showTime.hall?.name}
        </div>
        <div>price: {showTime.price}</div>
        <div>seat nr: {seatNr}</div>
      </div>
      {onRemove ? (
        <div className="grid grid-cols-3 place-items-end content-end">
          <p></p>
          <p></p>
          <TButton label="remove" color="danger" clickAction={onRemove} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  ) : (
    <div> no data </div>
  );
};

export default Ticket;
