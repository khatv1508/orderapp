import {
    API_URL, 
    GET_ALL_TABLE,
} from "./thunk-config";
import { settingSlice } from "../slices/slice-setting";
import { snackBarSlice } from "../slices/slice-snack-bar";

//  Get all table
export const fetchAllTable = () => async dispatch => {
    try {
        const response = await fetch(API_URL.concat(GET_ALL_TABLE), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // save list table
            dispatch(settingSlice.actions.setListTable(result));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Can not get result"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Fail! " + error}));
    }
}