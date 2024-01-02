import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { setupUser } from "../utils/appauth";
import { userService } from "../services/user.service";
import TButton from "../components/TButton";

const LoginPage = () => {
  const navigate = useNavigate();
  const validationScheme = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .lowercase(),
    password: Yup.string().min(6).required(),
  });
  const [errMsg, setErrMsg] = useState(null);
  const { values, handleChange, handleSubmit, errors, isValid, dirty } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        userService.login(values).then((res) => {
          setupUser(res.data);
          navigate("/overview");
        }).catch(err => {
          if (err.response.status === 401 || err.response.status === 404) {
            setErrMsg("Invalid credentials")
          }
        });
      },
      validationSchema: validationScheme,
    });

  const goToRegisterPage = () => {
    navigate("/register");
  };

  const onFieldsChange = (e) => {
    setErrMsg(null);
    handleChange(e);
  }

  return (
    <div className="bg-gray-500 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Log in to Web3 Cinema
        </h2>

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
              onChange={onFieldsChange}
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
              onChange={onFieldsChange}
            />
            {errors.password != null ? (
              <p className="text-sm text-red-600 my-1">{errors.password}</p>
            ) : (
              <p className="text-sm text-gray-600 my-1">
                Minimum 6 characters.
              </p>
            )}
          </div>
          <TButton
            type="submit"
            color={"primary"}
            label="Submit"
            fullWidth={true}
            bold={true}
          />
          <div className="text-sm text-red-600 my-1">{errMsg}</div>
          <div className="my-8 ">
            <p className="inline-block text-sm">Don't have account?</p>
            <TButton
              color="secondary"
              label="Register"
              clickAction={goToRegisterPage}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
