import {
    API_URL, 
    GET_ALL_MEMU,
    POST_ADD_MEMU,
    PUT_UPDATE_MENU,
    PUT_UPDATE_IMAGE_MENU,
    DELETE_MENU    
} from "./thunk-config";

import { snackBarSlice } from "../slices/snack-bar";
import { menuFormSlice } from "../slices/menu-form";

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 }

//  Get all menu
export const fetchAllMenu = (page, size) => async dispatch => {
    try {
        const data = {
            page: page ? page : 1,
            size: size ? size : 4
        } 
        let reqParam = encodeQueryData(data);

        const response = await fetch(API_URL.concat(GET_ALL_MEMU.concat("?").concat(reqParam)), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // save list menu
            dispatch(menuFormSlice.actions.setListMenu(result));

            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: "Get all menu success!"}));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not get result"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}

// Add menu
export const fetchAddMenu = (menu) => async dispatch => {
    try {
        const data = {
            food_name: menu.food_name,
            price: menu.price,
            type_id: menu.type_id
        }
        const response = await fetch(API_URL.concat(POST_ADD_MEMU), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    
        const result = await response.json();
        if (result) {
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: result.message}));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not add menu"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}

// Update menu
export const fetchUpdateMenu = (menu) => async (dispatch, getState) => {
    try {
        const state = getState();
        const pagination = state.menuForm.pagination;

        const data = {
            id: menu.id,
            food_name: menu.food_name,
            price: menu.price,
            type_id: menu.type_id
        }

        const response = await fetch(API_URL.concat(PUT_UPDATE_MENU.replace(':id', menu.id)), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    
        const result = await response.json();
        if (result) {
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: result.message}));
            dispatch(fetchAllMenu(pagination.currentPage, undefined));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not update table"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
    
}

// Update image menu
export const fetchUpdateImageMenu = (menu) => async (dispatch, getState) => {
    try {
        const state = getState();
        const pagination = state.menuForm.pagination;

        const data = {
            id: menu.id,
            image: menu.image,
        }

        const response = await fetch(API_URL.concat(PUT_UPDATE_IMAGE_MENU.replace(':id', menu.id)), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    
        const result = await response.json();
        if (result) {
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: result.message}));
            dispatch(fetchAllMenu(pagination.currentPage, undefined));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not update table"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
    
}

// Delete menu
export const fetchDeleteMenu = (id) => async dispatch => {
    try {
        const response = await fetch(API_URL.concat(DELETE_MENU.replace(':id', id)), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: result.message}));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not delete table"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
    
}