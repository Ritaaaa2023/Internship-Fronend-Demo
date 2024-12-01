import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    eventData: {}, // Store form data
  },
  reducers: {
    saveFormData: (state, action) => {
      state.eventData = action.payload; // Save form data
    },
  },
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
