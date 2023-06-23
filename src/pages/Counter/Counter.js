import React from "react";
import "./Counter.css";
import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../../store/counterSlice";
import { authSlice } from "../../store/authSlice";

import { Link, Navigate } from "react-router-dom";
const Counter = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state);
  const authState = useSelector((state) => state.auth);
  const token = localStorage.getItem("auth_token");

  const count = () => {
    dispatch(counterSlice.actions.increaseCounter(counterState.counter));
  };
  const reset = () => {
    dispatch(counterSlice.actions.reset(counterState.counter));
  };
  const save = () => {
    // dispach(authSlice.actions.setData(decoded));
    const date = new Date();
    const savedData = {
      fullName: authState.fullName,
      id: authState.id,
      counter: counterState.counter.counter,
      date:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    };
    dispatch(counterSlice.actions.saveData(savedData));
  };

  return (
    <div className="App">
      <div className="counter">
        <div className="display">
          <button
            onClick={() => {
              console.log(counterState.counter.saved);
            }}
          >
            Console
          </button>
          <h1>{counterState.counter.counter}</h1>
        </div>
        <div className="buttons">
          <button
            className="count"
            onClick={() => {
              count();
            }}
          >
            count
          </button>
          {token && (
            <button
              className="save"
              onClick={() => {
                save();
              }}
            >
              Save
            </button>
          )}
          <button
            className="reset"
            onClick={() => {
              reset();
            }}
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
