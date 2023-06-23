import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { authSlice, testSlice } from "./authSlice";
// import { quoteSlice } from "./quoteSlice";
import { counterSlice } from "./counterSlice";

export const rootReduer = combineReducers({
  auth: authSlice.reducer,
  counter: counterSlice.reducer,
});
