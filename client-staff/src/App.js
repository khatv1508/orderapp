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
import { useDispatch } from 'react-redux';

import { fetchAllTable } from "./store/thunk/thunk-table";
import { fetchAllMenu } from "./store/thunk/thunk-menu";
import { fetchAllAccount } from "./store/thunk/thunk-account";
import { fetchAllTurn } from "./store/thunk/thunk-history";


function App() {
  let match = useRouteMatch();
  const dispatch = useDispatch();

  // load data 
  React.useEffect(() => {
    dispatch(fetchAllTable());
    dispatch(fetchAllMenu());
    dispatch(fetchAllAccount());
    dispatch(fetchAllTurn());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="main-home" >
        <Menu />
        <SnackBar />
        <div className="blur-bg">
          <div className="background"></div>
          <div className="foreground">
            <Switch>
              <Route path={`${match.path}/history`}>
                <History />
              </Route>
              <Route path={`${match.path}/account`}>
                <Account />
              </Route>
              <Route path={`${match.path}/menu`}>
                <MenuManagement />
              </Route>
              <Route path={`${match.path}/table`}>
                <Table />
              </Route>
              <Route path={match.path}>
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
