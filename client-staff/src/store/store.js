import { createStore, combineReducers, applyMiddleware} from 'redux';
import { menuSlice } from './slices/menu';
import { accountFormSlice } from './slices/account-form';
import { menuFormSlice } from './slices/menu-form';
import { snackBarSlice } from './slices/snack-bar';
import { tableFormSlice } from './slices/table-form';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// import thunk
import { fetchAllTable, fetchAddTable, fetchDeleteTable } from "./thunk/thunk-table";

const reducer = combineReducers({
  menu: menuSlice.reducer,
  accountForm: accountFormSlice.reducer,
  menuForm: menuFormSlice.reducer,
  snackBar: snackBarSlice.reducer,
  tableForm: tableFormSlice.reducer
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(
    reducer, composedEnhancer
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// dispatch thunk
store.dispatch(fetchAllTable);
store.dispatch(fetchAddTable);
store.dispatch(fetchDeleteTable);