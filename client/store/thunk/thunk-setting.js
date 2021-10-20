import {
    API_URL, 
    GET_ALL_TABLE,
} from "./thunk-config";
import { settingSlice } from "../slices/slice-setting";

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
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}