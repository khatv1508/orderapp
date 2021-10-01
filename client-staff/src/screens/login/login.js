import React from "react";
import {
  Grid,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  Button,
  Divider
} from '@mui/material';
import {
  RiAccountCircleLine,
  RiLockPasswordLine
} from "react-icons/ri";

import "./login.css";
import logo from "../../assets/image/logo.png"

function Login (){
  return (
    <div className="main">
      <Grid container spacing={2}>
        <Grid item lg={8}>
        </Grid>
        <Grid className="form-container" item lg={4}>
          <Paper className="form-login" elevation={0}>
            <img className="logo" src={logo} alt="logo"/>
            <Divider className="line"/>
            <h1>Login</h1>
            <form className="form">
              <FormControl variant="standard">
                <TextField className="account"
                  id="input-with-icon-textfield"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiAccountCircleLine />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="Your name"
                />
              </FormControl>

              <FormControl variant="standard">
                <TextField className="password"
                  id="input-with-icon-textfield"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiLockPasswordLine />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="Password"
                  type="password"
                />
              </FormControl>

              <Button className="btn-login" variant="contained">Sign in</Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;