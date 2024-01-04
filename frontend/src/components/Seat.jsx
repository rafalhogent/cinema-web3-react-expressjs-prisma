import React, { useMemo } from "react";

const Seat = ({
  selected = false,
  disabled = false,
  nr = 0,
  clickAction = () => {},
}) => {
  const baseCss = [
    "border  rounded-md  ",
    "p-1 text-xs w-8",
    "md:w-10 md:text-md ",
    "lg:p-2 lg:text-lg lg:w-16 ",
  ];
  const enebledCss = "border-red-800 hover:bg-red-800 hover:border-black hover:text-white";
  const disabledCss = "bg-gray-300 text-gray-400";
  const selectedCss = "bg-red-600 text-yellow-300";
  const freeCss = "bg-transparent text-red-600";

  const seatCss = useMemo(() => {
    const cs = baseCss;
    if (disabled) {
      cs.push(disabledCss)
    } else {
      cs.push(enebledCss);
      cs.push(selected ? selectedCss : freeCss);
    }
    return cs.join(" ");
  }, [selected, disabled]);

  return (
    <button disabled={disabled} className={seatCss} onClick={() => clickAction(nr)}>
      {nr}
    </button>
  );
};

export default Seat;
