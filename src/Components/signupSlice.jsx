import { createSlice } from "@reduxjs/toolkit";
import { signupUser } from "./globalAPIs";

export const signupSlice = createSlice({
  name: "signup ",

  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = signupSlice.actions;

export const createUserAsync = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await signupUser(userData);
    dispatch(setLoading(false));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError("Error creating user"));
  }
};

export default signupSlice.reducer;
