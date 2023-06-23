import React, { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import Counter from "./pages/Counter/Counter";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import jwtDecode from "jwt-decode";
import { authSlice } from "./store/authSlice";

const NavigationRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(authSlice.actions.setData(decoded));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
const App = () => {
  return (
    <Provider store={store}>
      <NavigationRoutes />
    </Provider>
  );
};

export default App;
