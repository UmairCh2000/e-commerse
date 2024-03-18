import React, { useEffect, useState } from "react";
import "./checkOut.css";
import { Checkbox, TextField } from "@mui/material";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// import Cart from "../Cart/Cart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CheckOut = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setCart([]); // Reset the cart to an empty array
  };
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "postalCode":
        setPostalCode(value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
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

  const calculateDeliveryCharge = (subtotal) => {
    return subtotal > 75 ? 0 : 6.5;
  };

  const subtotal = calculateTotal();
  const discount = calculateDiscount(subtotal);
  const discountAmount = (subtotal * discount).toFixed(2);
  const deliveryCharge = calculateDeliveryCharge(subtotal);
  const total = (
    parseFloat(subtotal) +
    parseFloat(deliveryCharge) -
    parseFloat(discountAmount)
  ).toFixed(2);

  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleConfirmation = () => {
    handleClose(); // Close the modal
    navigate("/home"); // Redirect to the home screen
  };

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);

    if (
      email !== "" &&
      country !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      address !== "" &&
      city !== "" &&
      postalCode !== ""
    ) {
      handleOpen();
    }
  };

  //   const cartData = JSON.parse(localStorage.getItem("/cart")) || [];
  return (
    <div className="checkOutMain">
      <h1>CHECKOUT</h1>
      <div className="checkOutSubMain">
        <div className="checkOutContainer">
          <h1>Contact</h1>
          <Box
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "70ch" },
            }}
            noValidate
            autoComplete="on"
          >
            {" "}
            <TextField
              id="filled-basic"
              label="Email Address"
              variant="filled"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <h1>Delivery</h1>

          <Box
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "70ch" },
            }}
            noValidate
            autoComplete="on"
          >
            {" "}
            <TextField
              id="filled-basic"
              label="Country / Region"
              variant="filled"
              name="Country / Region"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="First Name"
              variant="filled"
              name="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Last Name"
              variant="filled"
              name="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Address"
              variant="filled"
              name="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="City"
              variant="filled"
              name="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Postal Code"
              variant="filled"
              name="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            {/* <TextField id="filled-basic" label="First Name" variant="filled" />
            <TextField id="filled-basic" label="Last Name" variant="filled" />
            <TextField id="filled-basic" label="Address" variant="filled" />
            <TextField id="filled-basic" label="City" variant="filled" />
            <TextField id="filled-basic" label="Postal Code" variant="filled" /> */}
          </Box>
          {isFormSubmitted &&
            (email === "" ||
              country === "" ||
              firstName === "" ||
              lastName === "" ||
              address === "" ||
              city === "" ||
              postalCode === "") && (
              <Typography variant="body2" color="error">
                Please fill out all the fields.
              </Typography>
            )}
          <button onClick={handleFormSubmit}>Confirm Order</button>
          <Modal
            style={{ border: "none", borderRadius: "15px" }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Your Order is confirmed
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Thanks for shopping! your order hasn’t shipped yet, but we
                  will send you and email when it’s done
                </Typography>

                <button
                  style={{
                    borderStyle: "none",
                    borderRadius: "10px",
                    background: "#072a48",
                    color: "aliceblue",
                    padding: "10px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleConfirmation}
                >
                  Back To Home
                </button>
              </Box>
            </Fade>
          </Modal>
        </div>
        <div className="checkOutCart">
          <div className="productHeaderContainer"></div>
          {cart.map((item, index) => (
            <div className="cartDetails" key={index}>
              <TableContainer component={Paper}>
                <Table
                  style={{ width: 850, fontSize: 20 }}
                  aria-label="simple table"
                >
                  <TableBody>
                    <TableRow>
                      <img src={item.image} alt="" />
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
              <h3>Dilevery: </h3>
              <h5>{deliveryCharge}$</h5>
            </div>
            <div className="total">
              <h3>Total: </h3>
              <h5>{total}$</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
