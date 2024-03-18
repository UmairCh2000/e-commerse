import React, { useState } from "react";
import "./signUp.css";
import mainImg from "../../assets/images/signUp.png";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "../signupSlice";

const SignUp = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.signup.loading);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signin");
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    dispatch(createUserAsync(userData));
    <SignUp />;
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="box">
      <div className="image">
        <img src={mainImg} alt="" />
      </div>

      <div className="content">
        <h1>Create New Account</h1>
        <h4>Please Enter Details</h4>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              borderRadius: "20px",
              m: 2,
              width: "80ch",
              borderBlockColor: indigo[900],
              color: indigo[900],
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              sx={{
                borderRadius: "10px",
                borderBlockColor: indigo[900],
              }}
              margin="normal"
              label="First Name"
              placeholder="ex. Muhammad"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              sx={{
                borderRadius: "10px",
                borderBlockColor: indigo[900],
              }}
              margin="normal"
              label="Last Name"
              placeholder="ex. Umair"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              type="email"
              margin="normal"
              label="Email Address"
              placeholder="umair.munawar2000@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl
              sx={{
                m: 2,
                width: "80ch",
                borderBlockColor: indigo[900],
                borderRadius: "10px",
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        color: indigo[900],
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>

          <div className="check-box">
            <FormGroup
              sx={{
                m: 2,
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label={<b>Terms and Conditions.</b>}
              />
            </FormGroup>
          </div>
        </Box>

        <ul className="ul">
          <li className="li">
            <Button
              onClick={handleSignUp}
              disabled={loading}
              to="/signin"
              exact="true"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </li>
          <hr />
          <h3>Already have an account</h3>
          <li className="li">
            <NavLink to="/signin" exact="true">
              Sign In
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignUp;
