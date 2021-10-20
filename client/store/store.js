import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { settingSlice } from './slices/slice-setting';
import { menuSlice } from './slices/slice-menu';

// import thunk
import { fetchAllTable } from "./thunk/thunk-setting";
import { fetchAllMenu } from "./thunk/thunk-menu";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const reducer = combineReducers({
    setting: settingSlice.reducer,
    menu: menuSlice.reducer,
  });

export const store = createStore(
    reducer, composedEnhancer
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// dispatch thunk
// table
store.dispatch(fetchAllTable);
store.dispatch(fetchAllMenu);