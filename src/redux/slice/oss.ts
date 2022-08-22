import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Formate } from "@/interface/type";

export interface OssState {
  format: Formate[] | null;
}

const initialState: OssState = {
  format: null,
};

export const ossSlice = createSlice({
  name: "oss",
  initialState,
  reducers: {
    updateOssFormat: (state, action: PayloadAction<Formate[]>) => {
      state.format = action.payload;
    },
  },
});

export const { updateOssFormat } = ossSlice.actions;
export default ossSlice.reducer;
