import { createStore, combineReducers} from 'redux';
import { menuSlice } from './slices/menu';
import { accountFormSlice } from './slices/account-form';
import { menuFormSlice } from './slices/menu-form';
import { snackBarSlice } from './slices/snack-bar';
import { tableFormSlice } from './slices/table-form';

const reducer = combineReducers({
  menu: menuSlice.reducer,
  // orther reducer...
  accountForm: accountFormSlice.reducer,
  menuForm: menuFormSlice.reducer,
  snackBar: snackBarSlice.reducer,
  tableForm: tableFormSlice.reducer
});

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);