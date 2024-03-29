import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-600 p-4 flex justify-around text-white">
      <NavLink
        to="/overview"
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

      <NavLink
        to="/tickets"
        className={({ isActive }) =>
          isActive ? "underline underline-offset-8" : "no-underline"
        }
      >
        My Tickets
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? "underline underline-offset-8" : "no-underline"
        }
      >
        My Cart
      </NavLink>

      <NavLink to="/logout" className="no-underline">
        Logout
      </NavLink>
    </div>
  );
};

export default Navbar;
