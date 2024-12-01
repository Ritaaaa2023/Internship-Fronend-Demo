import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice"; // Import the slice

const store = configureStore({
  reducer: {
    form: formReducer, // Add form reducer
  },
});

export default store;
