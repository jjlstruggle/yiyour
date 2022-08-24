import { configureStore } from "@reduxjs/toolkit";

<<<<<<< HEAD
const store = configureStore({
  reducer: {},
=======
import oss from "./slice/oss";

export default configureStore({
  reducer: { oss },
>>>>>>> 79ba7481f48d7833137f8cc7c5ef7266fdc17440
});
export type AppDispatch = typeof store.dispatch;
export default store;