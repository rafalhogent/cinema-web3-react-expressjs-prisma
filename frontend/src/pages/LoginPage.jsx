import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { setupUser } from "../utils/appauth";

const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const validationScheme = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .lowercase(),
    password: Yup.string().min(6).required(),
  });

  const { values, handleChange, handleSubmit, errors, isValid, dirty } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        // POST request -> React Query -> Axios
        handleLogin(values);
      },
      validationSchema: validationScheme,
    });

  const goToRegisterPage = () => {
    navigate("/register");
  };

  const handleLogin = async (credentials) => {
    const res = await Axios.post(`${backend_url}/users/login`, credentials, {
      withCredentials: true,
    });
    // localStorage.setItem("appuser", JSON.stringify(res.data));
    setupUser(res.data);
    navigate("/overview");
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Log in</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              placeholder="example@hogent.be"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email != null ? (
              <p className="text-sm text-red-600 my-1">{errors.email}</p>
            ) : (
              <p className="text-sm text-gray-600 my-1">required</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password *
            </label>
            <input
              type="password"
              id="password"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password != null ? (
              <p className="text-sm text-red-600 my-1">{errors.password}</p>
            ) : (
              <p className="text-sm text-gray-600 my-1">
                Minimum 6 characters.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 "
          >
            Submit
          </button>
          <div className="my-8 ">
            {" "}
            <p className="inline-block text-sm">Don't have account?</p>
            <button
              onClick={goToRegisterPage}
              type="button"
              className="mx-3 w-50 px-4 py-2 rounded-lg hover:bg-green-600 outline-2 focus:ring-2 focus:ring-opacity-50 inline-block"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
