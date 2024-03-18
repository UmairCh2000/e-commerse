import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../Components/globalAPIs";

const initialState = {
  user: null,
  status: "idle",
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginPending(state) {
      state.status = "loading";
    },
    loginSuccess(state, action) {
      state.status = "succeeded";
      state.user = action.payload;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    logout(state, action) {
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
  },
});

export const { loginPending, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  dispatch(loginPending());
  try {
    const userData = await loginUser(username, password);
    dispatch(loginSuccess(userData));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export default authSlice.reducer;
