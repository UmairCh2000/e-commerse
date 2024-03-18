import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import Home from "./Components/Home/Home.jsx";
import { Provider } from "react-redux";
import store from "./Components/store.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import ContactUs from "./Components/ContactUs/ContactUs.jsx";
import Product from "./Components/Products/Product.jsx";
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import Cart from "./Cart/Cart.jsx";
import WishList from "./WishList/WishList.jsx";
import CheckOut from "./CheckOut/CheckOut.jsx";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />{" "}
      <Route path="home" element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="contactus" element={<ContactUs />} />
      <Route path="products" element={<Product />} />
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="fav" element={<WishList />} />
      <Route path="checkOut" element={<CheckOut />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);
