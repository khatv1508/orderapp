import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { menuSlice } from './slices/menu';
import { accountFormSlice } from './slices/account-form';
import { menuFormSlice } from './slices/menu-form';
import { snackBarSlice } from './slices/snack-bar';
import { tableFormSlice } from './slices/table-form';
import { historyFormSlice } from './slices/history-form';

// import thunk
import { 
  fetchAllTable, 
  fetchAddTable, 
  fetchDeleteTable 
} from "./thunk/thunk-table";
import { 
  fetchAllMenu, 
  fetchAddMenu, 
  fetchDeleteMenu, 
  fetchUpdateMenu, 
  fetchUpdateImageMenu 
} from "./thunk/thunk-menu";
import { 
  fetchAllAccount, 
  fetchAddAccount, 
  fetchUpdateAccount,
  fetchResetPassAccount,
  fetchDeleteAccount 
} from "./thunk/thunk-account";
import { 
  fetchAllTurn,  
} from "./thunk/thunk-history";

const reducer = combineReducers({
  menu: menuSlice.reducer,
  accountForm: accountFormSlice.reducer,
  menuForm: menuFormSlice.reducer,
  snackBar: snackBarSlice.reducer,
  tableForm: tableFormSlice.reducer,
  historyForm: historyFormSlice.reducer
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(
    reducer, composedEnhancer
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// dispatch thunk
// table
store.dispatch(fetchAllTable);
store.dispatch(fetchAddTable);
store.dispatch(fetchDeleteTable);

// menu
store.dispatch(fetchAllMenu);
store.dispatch(fetchAddMenu);
store.dispatch(fetchUpdateMenu);
store.dispatch(fetchUpdateImageMenu);
store.dispatch(fetchDeleteMenu);

// account
store.dispatch(fetchAllAccount);
store.dispatch(fetchAddAccount);
store.dispatch(fetchUpdateAccount);
store.dispatch(fetchResetPassAccount);
store.dispatch(fetchDeleteAccount);

// bill
store.dispatch(fetchAllTurn);