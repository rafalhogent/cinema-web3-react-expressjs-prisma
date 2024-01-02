import React, { useMemo } from "react";

const TButton = ({
  color,
  label = "Button",
  type = "button",
  fullWidth = false,
  bold = false,
  clickAction = () => {},
}) => {
  const classString = useMemo(() => {
    const base = `bg-transparent hover:text-white py-2 px-4 border hover:border-transparent rounded-md inline-block`;
    const primary = `hover:bg-blue-600 text-blue-600 border-blue-600`;
    const secondary = `hover:bg-teal-600 text-teal-600 border-teal-600`;
    const danger = `hover:bg-red-600 text-red-600 border-red-600`;
    const colors =
      color == "primary" ? primary : color == "danger" ? danger : secondary;
    const styles = `${bold ? "font-semibold" : ""} ${
      fullWidth ? "w-full" : "mx-3"
    }`;
    const txt = [base, styles, colors].join(" ");

    return txt;
  }, [color, fullWidth, bold]);
  return (
    <button type={type} className={classString} onClick={clickAction}>
      {label}
    </button>
  );
};

export default TButton;
