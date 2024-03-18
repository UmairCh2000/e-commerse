import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "./globalAPIs";

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();
    dispatch(setSuccess(response));
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.status = "loading";
    },
    setSuccess: (state, action) => {
      state.product = action.payload;
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setLoading, setSuccess, setError } = productsSlice.actions;

export default productsSlice.reducer;
