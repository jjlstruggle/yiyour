import { configureStore } from "@reduxjs/toolkit";

import oss from "./slice/oss";

export default configureStore({
  reducer: { oss },
});
