import './App.css';
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

function App() {
  let match = useRouteMatch();

  return (
    <div className="container">
      <div className="main-home" >
        <Menu />
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
