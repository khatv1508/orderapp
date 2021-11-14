import {
    API_URL, 
    GET_ALL_MEMU,
    GET_ALL_MEMU_BY_TYPE
} from "./thunk-config";

import { menuSlice } from "../slices/slice-menu";
import { snackBarSlice } from "../slices/slice-snack-bar";

//  Get all menu
export const fetchAllMenu = () => async dispatch => {
    try {
        const response = await fetch(API_URL.concat(GET_ALL_MEMU.concat("?isNotPagination=true")), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // save list menu
            dispatch(menuSlice.actions.setListAllMenu(result.rows));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Can not get menu result"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Fail! " + error}));
    }
}

//  Get all menu by type
export const fetchAllMenuByType = (type_id) => async dispatch => {
    try {
        const response = await fetch(API_URL.concat(GET_ALL_MEMU_BY_TYPE.replace(':type_id', type_id)), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        
        if (result) {
            // save list menu
            dispatch(menuSlice.actions.setListMenu(result));
            // show snack-bar
            // dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Get menu by type success!"}));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Can not get menu result"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Fail! " + error}));
    }
}