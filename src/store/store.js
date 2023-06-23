import { configureStore } from "@reduxjs/toolkit";
import { rootReduer } from "./reducer";

export const store = configureStore({
  reducer: rootReduer,
});
