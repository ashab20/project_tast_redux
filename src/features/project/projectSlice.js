import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: [],
};
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    keySearch: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.search = [];
    },
  },
});

export default projectSlice.reducer;
export const { keySearch, clearSearch } = projectSlice.actions;
