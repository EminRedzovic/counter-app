import React from "react";
import "./Login.css";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { authSlice } from "../../store/authSlice";

const loginSchema = yup.object({
  email: yup.string().required("Nedostaje email").email("Email nije dobar"),
  // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
  password: yup
    .string()
    .required()
    .min(6)
    .max(50)
    //useRef
    .matches(/^[a-zA-Z0-9]+$/, "Lozinka može sadržavati samo slova i brojeve."),
});

const Login = () => {
  const navigate = useNavigate("/");
  const dispach = useDispatch();
  return (
    <div className="login-wrapper">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          fetch("https://js-course-server.onrender.com/user/login", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.token) {
                const decoded = jwtDecode(data.token);
                dispach(authSlice.actions.setData(decoded));
                console.log(decoded);
                navigate("/");
                console.log(data.token);
                localStorage.setItem("auth_token", data.token);
              }
              if (data.message) {
                alert(data.message);
              }
            });
        }}
        validationSchema={loginSchema}
        // validate={(values) => {
        //   const errors = {};
        //   if (
        //     !values.error ||
        //     values.error.length < 10 ||
        //     values.error.length > 100
        //   ) {
        //     errors.email = "Neispravan email";
        //   }
        //   return errors;
        // }}
      >
        {({
          values, // formikov state
          errors, // errors = { email: 'Neispravan email' }
          touched, // touched = { email: true }
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div>
            <button
              onClick={() => {
                console.log(values, "values");
                console.log(errors, "errors");
                console.log(touched, "touched");
              }}
            >
              Console log states
            </button>
            <div>
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p className="error-message">
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <p className="error-message">
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <button onClick={handleSubmit} type="button">
              Submit
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
