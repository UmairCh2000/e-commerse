import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import signupReducer from "./signupSlice";

export default configureStore({
  reducer: {
    rootReducer: authReducer,
    auth: authReducer,
    signup: signupReducer,
  },
});
