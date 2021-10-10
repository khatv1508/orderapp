import React from "react";
import {
  Grid,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  Button,
  Divider,
} from '@mui/material';
import {
  RiAccountCircleLine,
  RiLockPasswordLine
} from "react-icons/ri";
import "./login.css";
import logo from "../../assets/image/logo.png"
import { useSelector, useDispatch } from 'react-redux';
import { fetchCheckAccount } from "../../store/thunk/thunk-account";
import { Form, Field } from 'react-final-form';
import {
  Redirect
} from "react-router-dom";

function Login ( ){
  const { account_login } = useSelector((state) => state.accountForm);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(fetchCheckAccount(values));
  }

  return (
    <>
    {account_login ? <Redirect to="/app"/> : 
    <div className="main">
      <Grid container spacing={2}>
        <Grid item lg={8}>
        </Grid>
        <Grid className="form-container" item lg={4}>
          <Paper className="form-login" elevation={0}>
            <img className="logo" src={logo} alt="logo"/>
            <Divider className="line"/>
            <h1>Login</h1>

            <Form
              onSubmit={onSubmit}
              // validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="form">
                  <Field name="account_name">
                    {props => (
                      <div>
                        <FormControl fullWidth margin="normal">
                          <TextField
                            className="account"
                            name={props.input.name}
                            value={props.input.value}
                            onChange={props.input.onChange}
                            fullWidth
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
                      </div>
                    )}
                  </Field>
                  <Field name="account_pass">
                    {props => (
                      <div>
                        <FormControl fullWidth margin="normal">
                          <TextField
                            className="password"
                            name={props.input.name}
                            value={props.input.value}
                            onChange={props.input.onChange}
                            fullWidth
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
                      </div>
                    )}
                  </Field>
                  <Button className="btn-login" variant="contained" type="submit">
                    Sign in
                  </Button>
                </form>
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>}
    </>
  );
}

export default Login;