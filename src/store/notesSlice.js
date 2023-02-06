import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: {},
  },
  reducers: {
    setNote: (state, { payload }) => {
      state.notes = payload
    },
  },
});
export const { setNote } = notesSlice.actions;
export default notesSlice.reducer;
