import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../utils/appauth";
import TButton from "../components/TButton";
import { userService } from "../services/user.service";

const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;
const LoginPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    userService.logout().then(() => {
      clearStorage();
      navigate("/");
    });
  };
  return (
    <div className="bg-gray-500 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Are you sure you want to log out?
        </h2>

        <div className="my-4 ">
          <TButton
            color={"danger"}
            clickAction={handleLogout}
            label="Yes, please log me out"
          />
          <TButton
            color={"secondary"}
            clickAction={handleCancel}
            label="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
