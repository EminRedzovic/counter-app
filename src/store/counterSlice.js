import slice, { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const initialState = {
  counter: 0,
  saved: [],
};
export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,

  reducers: {
    increaseCounter(state, actions) {
      state.counter = actions.payload.counter + 1;
      return state;
    },
    saveData(state, actions) {
      const data = {
        counter: state.counter,
        saved: [actions.payload],
      };
      state = data;
      return state;
    },

    reset(state, actions) {
      return initialState;
    },
  },
});
