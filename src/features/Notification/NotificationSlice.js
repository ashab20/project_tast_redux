import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notice: "",
  condition:"",
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotice: (state, action) => {
      state.notice = action.payload.notice;
      state.condition = action.payload.condition;

    },
    removeNotice: (state) => {
        state.notice = "";
        state.condition = "";
    },
  },
});

export default notificationSlice.reducer;
export const { addNotice, removeNotice } = notificationSlice.actions;
