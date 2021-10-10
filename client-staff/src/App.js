import './App.css';
import React from "react";
import Menu from "./components/menu/menu";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Home from './screens/home/home';
import History from './screens/history/history';
import Account from './screens/account/account';
import MenuManagement from './screens/menu/menu';
import Table from './screens/table/table';
import SnackBar from "./components/snack-bar/snack-bar";
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllTable, fetchAllTableDetail } from "./store/thunk/thunk-table";
import { fetchAllMenu } from "./store/thunk/thunk-menu";
import { fetchAllAccount } from "./store/thunk/thunk-account";
import { fetchAllTurn } from "./store/thunk/thunk-history";
import {
  Redirect
} from "react-router-dom";

function App() {
  let match = useRouteMatch();
  const account_login = useSelector((state) => state.accountForm.account_login);
  const dispatch = useDispatch();

  // load data 
  React.useEffect(() => {
    if (account_login && account_login.role_id === 1) {
      dispatch(fetchAllTable());
      dispatch(fetchAllMenu());
      dispatch(fetchAllAccount());
    }
    dispatch(fetchAllTableDetail());
    // history
    dispatch(fetchAllTurn());
    // new order
    dispatch(fetchAllTurn(0));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {account_login ? <div className="container">
      <div className="main-home" >
        <Menu />
        <SnackBar />
        <div className="blur-bg">
          <div className="background"></div>
          <div className="foreground">
            <Switch>
              <Route path={`${match.path}/history`}>
                {account_login ? <History /> : <Redirect to="/login"/>}
              </Route>
              <Route path={`${match.path}/account`}>
                {account_login ? <Account /> : <Redirect to="/login"/>}
              </Route>
              <Route path={`${match.path}/menu`}>
                {account_login ? <MenuManagement /> : <Redirect to="/login"/>}
              </Route>
              <Route path={`${match.path}/table`}>
                {account_login ? <Table /> : <Redirect to="/login"/>}
              </Route>
              <Route path={match.path}>
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div> 
    : <Redirect to="/login"/>}
    </>
    
  );
}

export default App;
