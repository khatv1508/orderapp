import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './store/store';

import './index.css';
import App from './App';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./screens/login/login";

import { ThemeProvider } from '@mui/material/styles';
import MyTheme from "./theme/my-theme";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <ThemeProvider theme={MyTheme}>
        <Router>
          <Switch>
          <Route exact path="/">
              <Redirect to="/app"/>
            </Route>
            <Route path="/app">
              <App />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
