import React, { useMemo } from "react";

const Seat = ({ selected = false, nr = 0, clickAction = () => {} }) => {
  const baseCss = [
    "border border-red-800 rounded-md ",
    "hover:bg-red-800 hover:border-black hover:text-white ",
    "p-1 text-xs w-8",
    "md:w-10 md:text-md ",
    "lg:p-2 lg:text-lg lg:w-16 ",
  ];
  const selectedCss = "bg-red-600 text-yellow-300";
  const freeCss = "bg-transparent text-red-600";

  const seatCss = useMemo(() => {
    const cs = baseCss;
    cs.push(selected ? selectedCss : freeCss);
    return cs.join(" ");
  }, [selected]);

  return (
    <button className={seatCss} onClick={() => clickAction(nr)}>
      {nr}
    </button>
  );
};

export default Seat;
