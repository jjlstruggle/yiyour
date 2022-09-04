import { configureStore } from "@reduxjs/toolkit";
import oss from "./slice/oss";

const store = configureStore({
  reducer: { oss },
});
export type AppDispatch = typeof store.dispatch;

export default store;
