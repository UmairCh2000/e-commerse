import React, { useEffect, useState } from "react";
import "./wishList.css";
import { Alert, Box, CircularProgress, Rating, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/icons/cart 1.png";

const WishList = ({ props }) => {
  // const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [openFavSnackbar, setOpenFavSnackbar] = useState(false);

  useEffect(() => {
    const storedfav = localStorage.getItem("fav");
    if (storedfav) {
      setFav(JSON.parse(storedfav));
    }
  }, []);

  const removeFromWishlist = (index) => {
    setOpenFavSnackbar(true);
    const updatedFav = [...fav];
    updatedFav.splice(index, 1);
    setFav(updatedFav);
    localStorage.setItem("fav", JSON.stringify(updatedFav));
  };

  const handleCloseFavSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFavSnackbar(false);
  };

  return (
    <div className="mainWishList">
      <h1>Wish List</h1>
      {fav.length === 0 ? ( // If cart is empty, display message
        <div className="emptyWishlistMessage">
          <img src={emptyCart} alt="" />
        </div>
      ) : (
        <div className="wishListDetails">
          {fav.map((item, index) => (
            <div
              className="cardMain"
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="productImg">
                <img src={item.image} alt="" />
              </div>
              <div
                className={`innerMain ${hoverIndex === index ? "blur" : ""}`}
              >
                <div className="cardTitle">
                  <h2 style={{ color: "#072a48" }} className="productTitle">
                    {item.title}
                  </h2>
                  <Rating
                    style={{ color: "#072a48" }}
                    name="read-only"
                    value={item.rating?.rate}
                    readOnly
                  />{" "}
                  <h4 style={{ color: "#072a48" }}>({item.rating?.rate})</h4>
                </div>
                <div className="cardCat">
                  <h4 style={{ color: "#072a48" }}>
                    Category: {item.category}
                  </h4>
                </div>
                <div className="cardPrice">
                  <h3 style={{ marginRight: "5px", color: "#072a48" }}>
                    ({item.rating?.count}) {"Customer Reviews"}
                  </h3>{" "}
                  <h2 style={{ color: "#ff4646" }}>{item.price}$</h2>
                  {hoverIndex === index && (
                    <button
                      className="removeButton"
                      onClick={() => removeFromWishlist(index)}
                    >
                      Remove
                    </button>
                  )}
                  <Snackbar
                    open={openFavSnackbar}
                    autoHideDuration={1000}
                    onClose={handleCloseFavSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      variant="filled"
                      sx={{ width: "100%", backgroundColor: "#072a48" }}
                    >
                      Item removed from Favorites
                    </Alert>
                  </Snackbar>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
