import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-600 p-4 flex justify-around text-white">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "underline underline-offset-8" : "no-underline"
        }
      >
        Movies overview
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "underline underline-offset-8" : "no-underline"
        }
      >
        About
      </NavLink>
    </div>
  );
};

export default Navbar;
