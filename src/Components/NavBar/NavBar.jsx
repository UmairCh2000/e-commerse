import React, { useEffect, useState } from "react";
import "../NavBar/navBar.css";
import logo from "../../assets/images/Timless 1.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import fav from "../../assets/icons/fav.png";
import cart from "../../assets/icons/cart.png";
import logoutIcon from "../../assets/icons/logout.png";
import { Tooltip, IconButton, Drawer, Badge } from "@mui/material";
import { logout } from "../authSlice.jsx";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development.js";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(""); // State for cart item count
  const [favItemCount, setFavItemCount] = useState("0"); // State for favorites item count

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className="body">
        <div className="container">
          <NavLink to="/home" exact>
            <img src={logo} alt="" />
          </NavLink>
          <div className="txt-stack">
            <ul className="nav-links">
              <li>
                <NavLink to="/home" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" exact>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/aboutus" exact>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contactus" exact>
                  Contact Us
                </NavLink>
              </li>
              {!token && (
                <>
                  <li>
                    <NavLink to="/signin" exact>
                      Sign In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" exact>
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
              {token && (
                <div className="icon-box">
                  <li className="icons">
                    <Tooltip title="Cart">
                      <NavLink to="/cart" exact>
                        <img src={cart} alt="" />
                      </NavLink>
                    </Tooltip>
                  </li>
                  <li className="icons">
                    <Tooltip title="Favourite">
                      <NavLink to="/fav" exact>
                        <img src={fav} alt="" />
                      </NavLink>
                    </Tooltip>
                  </li>
                  <li className="icons">
                    <Tooltip title="Log Out">
                      <NavLink to="/signin" exact onClick={handleLogout}>
                        <img src={logoutIcon} alt="" />
                      </NavLink>
                    </Tooltip>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className="mobileContainer">
          <IconButton
            className="menu-icon"
            onClick={toggleDrawer}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* Mobile Drawer */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <div
              className="txt-stack"
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <img className="timeess" src={logo} alt="" />
              <ul className="drawer-links">
                <li>
                  <NavLink to="/home" exact>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" exact>
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/aboutus" exact>
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contactus" exact>
                    Contact Us
                  </NavLink>
                </li>
                {!token && (
                  <div className="signInUp">
                    <li className="signIn">
                      <NavLink to="/signin" exact>
                        Sign In
                      </NavLink>
                    </li>
                    <li className="signUp">
                      <NavLink to="/signup" exact>
                        Sign Up
                      </NavLink>
                    </li>
                  </div>
                )}
                {token && (
                  <div className="icon-box">
                    <li className="icons">
                      <Tooltip title="Cart">
                        <NavLink to="/cart" exact>
                          Cart
                        </NavLink>
                      </Tooltip>
                    </li>
                    <li className="icons">
                      <Tooltip title="Favourite">
                        <NavLink to="/fav" exact>
                          Wish List
                        </NavLink>
                      </Tooltip>
                    </li>
                    <li className="icons">
                      <Tooltip title="Log Out">
                        <NavLink to="/signin" exact onClick={handleLogout}>
                          Log Out
                        </NavLink>
                      </Tooltip>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </Drawer>
          <img className="timeess" src={logo} alt="" />
        </div>
      </div>
    </>
  );
};

export default NavBar;
