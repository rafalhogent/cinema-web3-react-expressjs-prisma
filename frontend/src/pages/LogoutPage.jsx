import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../utils/appauth";

const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;
const LoginPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {};

  const handleLogout = async () => {
    const res = await Axios.delete(`${backend_url}/users/logout`, {
      withCredentials: true,
    });
    clearStorage();
    navigate("/");
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Are you sure you want to log out?
        </h2>

        <div className="my-4 ">
          <button
            onClick={handleLogout}
            type="button"
            className="mx-3 w-50 px-4 py-2 rounded-lg hover:bg-green-600 outline-2 focus:ring-2 focus:ring-opacity-50 inline-block"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
