import axios from "axios";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post("https://fakestoreapi.com/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(
      "https://fakestoreapi.com/users",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchcategory = async () => {
  try {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categorized  product: ", error);
    return [];
  }
};
