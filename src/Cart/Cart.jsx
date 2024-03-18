import React, { useState, useEffect } from "react";
import "./cart.css";
import {
  Box,
  ButtonGroup,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import emptyCart from "../assets/icons/cart 1.png";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setLoading(false); // Set loading to false after cart data is fetched
  }, []);

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const calculateDiscount = (subtotal) => {
    if (subtotal > 10000) {
      return 0.4; // 40% discount
    } else if (subtotal > 1000) {
      return 0.2; // 20% discount
    } else if (subtotal > 500) {
      return 0.1; // 10% discount
    } else {
      return 0; // No discount
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const checkOutButton = () => {
    navigate("/checkOut");
  };

  const subtotal = calculateTotal();
  const discount = calculateDiscount(subtotal);
  const discountAmount = (subtotal * discount).toFixed(2);
  const total = (subtotal - discountAmount).toFixed(2);

  return (
    <div className="mainCart">
      <h1>Cart</h1>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : cart.length === 0 ? (
        <div className="emptyCartMessage">
          <img src={emptyCart} alt="" />
        </div>
      ) : (
        <div>
          <div className="productHeaderContainer">
            <TableContainer component={Paper}>
              <Table sx={{ width: 750 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" padding="10px">
                      Title
                    </TableCell>
                    <TableCell align="right" padding="10px">
                      Price
                    </TableCell>
                    <TableCell align="right" padding="10px">
                      Quantity
                    </TableCell>
                    <TableCell align="right" padding="10px">
                      Total
                    </TableCell>
                    <TableCell align="right" padding="10px">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </div>
          {cart.map((item, index) => (
            <div className="cartDetails" key={index}>
              <TableContainer component={Paper}>
                <Table
                  style={{ width: 750, fontSize: 20 }}
                  aria-label="simple table"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell align="left" style={{ width: 170 }}>
                        {item.title}
                      </TableCell>
                      <TableCell align="center">{item.price}$</TableCell>
                      <TableCell align="right">
                        <ButtonGroup>
                          <button
                            style={{ width: "30px" }}
                            onClick={() => decrementQuantity(index)}
                          >
                            -
                          </button>
                          <span style={{ margin: "5px 10px 0 10px" }}>
                            {item.quantity}
                          </span>
                          <button
                            style={{ width: "30px", marginRight: "60px" }}
                            onClick={() => incrementQuantity(index)}
                          >
                            +
                          </button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="left">
                        {item.quantity * item.price}$
                      </TableCell>
                      <TableCell align="right">
                        <button onClick={() => removeFromCart(index)}>
                          Remove
                        </button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
          <div className="subtotal">
            <div className="subtotalItems">
              <h3>Subtotal: </h3>
              <h5>{subtotal}$</h5>
            </div>
            {discountAmount > 0 && (
              <div className="discount">
                <h3>Discount: </h3>
                <h5>{discountAmount}$</h5>
              </div>
            )}
            <div className="total">
              <h3>Total: </h3>
              <h5>{total}$</h5>
            </div>
            <button style={{ fontSize: "20px" }} onClick={checkOutButton}>
              Check-Out
            </button>
            <NavLink to="/home">Continue Shopping</NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
