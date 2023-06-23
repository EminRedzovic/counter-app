import React from "react";
// import "./Login.css";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
const RegisterSchema = yup.object({
  email: yup.string().required("Nedostaje email").email("Email nije dobar"),
  // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
  password: yup
    .string()
    .required("Polje za sifru mora biti popunjeno")
    .min(6, "Sifra ne moze imati manje od 6 karaktera")
    .max(50, "Sifra ne sme biti duza od 50 karaktera"),
  confirmPassword: yup
    .string()
    .required("Polje za sifru mora biti popunjeno")
    .min(6, "Sifra ne moze imati manje od 6 karaktera")
    .max(50, "Sifra ne sme biti duza od 50 karaktera")
    .oneOf([yup.ref("password"), null], "Sifre se ne poklapaju"),
  fullName: yup
    .string()
    .required("Polje za fullName mora biti popunjeno")
    .matches(
      /^[a-zA-Z]+$/,
      "U full name ne smeju biti brojevi i drugi karakteri."
    ),
});
function Register() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values, actions) => {
          fetch("https://js-course-server.onrender.com/user/signup", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              //   console.log("nedes", data);

              if (data.userId) {
                navigate("/login");
                // console.log("aades");
              } else {
                alert(data.error);
              }
            });
          // .catch((error) => {
          //   alert("a");
          // });
        }}
        validationSchema={RegisterSchema}
      >
        {({
          values,
          errors,
          touched,
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
                type="fullName"
                name="fullName"
                placeholder="Full name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
              />
              <p className="error-message">
                {errors.fullName && touched.fullName && errors.fullName}
              </p>
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="e-mail"
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
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              <p className="error-message">
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
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
}

export default Register;
