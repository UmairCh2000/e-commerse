import React, { useState } from "react";
import "./signIn.css";
import mainImg from "../../assets/images/signIn.png";
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
import { login } from "../authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const handleLogin = () => {
    dispatch(login(username, password));
    navigate("/home");
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
        <h1>Welcome</h1>
        <h4>Please Login Here</h4>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              borderRadius: "10px",
              m: 1,
              width: "80ch",
              borderBlockColor: indigo[900],
              color: indigo[900],
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="signUpInput">
            <p>* mor_2314</p>

            <TextField
              sx={{
                borderRadius: "10px",
                borderBlockColor: indigo[900],
              }}
              margin="normal"
              label="Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <p>* 83r5^_</p>
            <FormControl
              sx={{
                m: 1,
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                label="Password"
              />
            </FormControl>
          </div>

          <div className="check-box">
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Remember me" />
            </FormGroup>
          </div>
        </Box>

        <ul className="ul">
          <li className="li">
            <Button to="/signin" onClick={handleLogin} exact="true">
              Sign In
            </Button>
          </li>
          <hr />
          <h3>Don't have an account</h3>
          <li className="li">
            <NavLink to="/signup" exact="true">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignIn;
