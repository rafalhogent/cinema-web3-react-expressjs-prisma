import React, { useMemo } from "react";

const TButton = ({
  color = "secondary",
  label = "Button",
  type = "button",
  fullWidth = false,
  bold = false,
  clickAction = () => {},
  isSelected = false,
}) => {
  const classString = useMemo(() => {
    const base = `hover:text-white py-2 px-4 border hover:border-transparent rounded-md inline-block`;
    const colors = {
      primary:
        "hover:bg-blue-600 border-blue-600 " +
        (isSelected
          ? " text-white bg-blue-800 "
          : " bg-transparent text-blue-800  "),
      secondary:
        "hover:bg-teal-600 border-teal-600 " +
        (isSelected
          ? " text-white bg-teal-800 "
          : " text-teal-800 bg-transparent "),
      danger:
        "hover:bg-red-600 border-red-600 " +
        (isSelected
          ? " text-white bg-red-800 "
          : " bg-transparent text-red-800 "),
    };

    const styles = `${bold ? "font-semibold" : ""} ${
      fullWidth ? "w-full" : "mx-3"
    }`;
    const txt = [base, styles, colors[color]].join(" ");

    return txt;
  }, [color, fullWidth, bold, isSelected]);
  return (
    <button type={type} className={classString} onClick={clickAction}>
      {label}
    </button>
  );
};

export default TButton;
