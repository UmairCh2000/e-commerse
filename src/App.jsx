import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";

function App() {
  localStorage.setItem("cart", []);
  localStorage.setItem("fav", []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
