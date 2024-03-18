import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector
import "./productDetail.css";
import { Alert, Rating, Snackbar } from "@mui/material";
import favImg from "../assets/icons/fav1.png";
import altFavImg from "../assets/icons/altfav1.png";
import freeShip from "../assets/icons/freeShipping.png";
import ship from "../assets/icons/shipping.png";
import addCart from "../assets/icons/addCart.png";
import buyItem from "../assets/icons/buyItem.png";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const ProductDetail = () => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [fav, setFav] = useState([]);
  const [buy, setBuy] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCartSnackbar, setOpenCartSnackbar] = useState(false);
  const [openFavSnackbar, setOpenFavSnackbar] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const navigate = useNavigate();

  const handleCloseCartSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCartSnackbar(false);
  };

  const handleCloseFavSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFavSnackbar(false);
  };

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    const storedCart = localStorage.getItem("cart");
    if (storedProduct) {
      setCurrentProduct(JSON.parse(storedProduct));
    }
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    const favItem = localStorage.getItem("fav");
    if (storedProduct) {
      setCurrentProduct(JSON.parse(storedProduct));
    }
    if (favItem) {
      setFav(JSON.parse(favItem));
    }
  }, []);

  useEffect(() => {
    const existingProductIndex = fav.findIndex(
      (item) => item.id === currentProduct.id
    );
    setIsInWishlist(existingProductIndex !== -1);
  }, [currentProduct, fav]);

  const addToFav = () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    const existingProductIndex = fav.findIndex(
      (item) => item.id === currentProduct.id
    );

    if (existingProductIndex === -1) {
      setOpenFavSnackbar(true);
      const updatedFav = [...fav, { ...currentProduct, quantity: 0 }];
      setFav(updatedFav);
      localStorage.setItem("fav", JSON.stringify(updatedFav));
      setIsInWishlist(true);
    } else {
      setOpenFavSnackbar(true); // Show remove snackbar
      const updatedFav = fav.filter((item) => item.id !== currentProduct.id);
      setFav(updatedFav);
      localStorage.setItem("fav", JSON.stringify(updatedFav));
      setIsInWishlist(false);
    }
  };

  const addToCart = () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    const existingProductIndex = cart.findIndex(
      (item) => item.id === currentProduct.id
    );

    if (existingProductIndex === -1) {
      const updatedCart = [...cart, { ...currentProduct, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setOpenCartSnackbar(true);
  };

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    const buyNow = localStorage.getItem("checkList");
    if (storedProduct) {
      setCurrentProduct(JSON.parse(storedProduct));
    }
    if (buyNow) {
      setBuy(JSON.parse(buyNow));
    }
  }, []);

  const checkOutButton = () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    const existingProductIndex = cart.findIndex(
      (item) => item.id === currentProduct.id
    );

    if (existingProductIndex === -1) {
      const updatedCart = [...cart, { ...currentProduct, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === currentProduct.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const updatedChecklist = [...buy, { ...currentProduct, quantity: 1 }];
    setBuy(updatedChecklist);
    localStorage.setItem("checkList", JSON.stringify(updatedChecklist));

    setOpen(true);
    navigate("/checkOut");
  };

  const incrementQuantity = () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    const existingProductIndex = cart.findIndex(
      (item) => item.id === currentProduct.id
    );

    if (existingProductIndex === -1) {
      const updatedCart = [...cart, { ...currentProduct, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === currentProduct.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  const decrementQuantity = () => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === currentProduct.id) {
          if (item.quantity === 1) {
            return null;
          } else {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
      .filter(Boolean);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const existingProductIndex = fav.findIndex(
      (item) => item.id === currentProduct.id
    );
    setIsInWishlist(existingProductIndex !== -1);
  }, [currentProduct, fav]);

  useEffect(() => {
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7);

    const deliveryDateFormat = (date) => {
      const options = { month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };

    const deliveryStart = deliveryDateFormat(new Date());
    const deliveryEnd = deliveryDateFormat(estimatedDeliveryDate);

    setDeliveryDate(`${deliveryStart} - ${deliveryEnd}`);
  }, []);

  return (
    <div className="mainProduct">
      <div className="headerMain">
        <h1>Fashion</h1>
      </div>
      <div className="subHeaderMain">
        <Link to="/home">Home</Link>
        <Link>/</Link>
        <Link to="/products">Products</Link>
        <Link>/</Link>
        <Link to="/">Detail</Link>
      </div>
      <div className="detailMainProducts">
        <div className="morePics">
          <img src={currentProduct.image} alt="" />
          <img src={currentProduct.image} alt="" />
          <img src={currentProduct.image} alt="" />
          <img src={currentProduct.image} alt="" />
        </div>
        <div className="mainProductPic">
          <img src={currentProduct.image} alt="" />
        </div>
        <div className="productDetails">
          <h1>{currentProduct.title}</h1>
          <div className="productDetailsRating">
            <Rating
              style={{ color: "red" }}
              name="read-only"
              value={currentProduct.rating?.rate}
              readOnly
            />
            <h4 style={{ marginLeft: "15px" }}>
              ({currentProduct.rating?.rate})
            </h4>
          </div>
          <h1>${currentProduct.price}</h1>
          <h1>Details:</h1>
          <p>{currentProduct.description}</p>
          <div className="productAddToCartBtn">
            <button className=" increament " onClick={decrementQuantity}>
              -
            </button>
            <span>
              {
                (
                  cart.find((item) => item.id === currentProduct.id) || {
                    quantity: 0,
                  }
                ).quantity
              }
            </span>
            <button className="deccreament " onClick={incrementQuantity}>
              +
            </button>
            <button className="addToCart" onClick={addToCart}>
              <img src={addCart} alt="" />
              Add to cart
            </button>
            <Snackbar
              open={openCartSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseCartSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                variant="filled"
                sx={{ width: "100%", backgroundColor: "#072a48" }}
              >
                Item added to Cart
              </Alert>
            </Snackbar>

            <div className="productAddToCartBtn">
              <button className="wishList" onClick={addToFav}>
                <img src={isInWishlist ? altFavImg : favImg} />{" "}
              </button>
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
                  {fav.findIndex((item) => item.id === currentProduct.id) !== -1
                    ? "Item added to Favorites"
                    : "Item removed from Favorites"}
                </Alert>
              </Snackbar>
            </div>
          </div>

          <button className="buyProduct" onClick={checkOutButton}>
            <img src={buyItem} alt="" />
            Buy Now
          </button>

          <div className="estimateTime">
            <img src={ship} alt="" />
            {deliveryDate && (
              <p>
                <b>Estimated Delivery Date:</b> {deliveryDate}
              </p>
            )}
          </div>

          <div className="freeShipping">
            <img src={freeShip} alt="" />
            <p>
              <b>Free Shipping & Returns:</b>On all orders over $75
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
