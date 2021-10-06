import {
    API_URL, 
    GET_ALL_TABLE,
    POST_ADD_TABLE,
    DELETE_TABLE,
} from "./thunk-config";
import { snackBarSlice } from "../slices/snack-bar";
import { tableFormSlice } from "../slices/table-form";

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
            dispatch(tableFormSlice.actions.setListTable(result));
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: "Get all table success!"}));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not get result"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}

// Add table 
export const fetchAddTable = (number) => async dispatch => {
    try {
        const data = {
            table_number: number
        }
        const response = await fetch(API_URL.concat(POST_ADD_TABLE), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    
        const result = await response.json();
        if (result) {
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: "Add table success!"}));
            dispatch(fetchAllTable());
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not add table"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}

// Delete table 
export const fetchDeleteTable = (id) => async dispatch => {
    try {
        const response = await fetch(API_URL.concat(DELETE_TABLE.replace(':id', id)), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: result.message}));
            dispatch(fetchAllTable());
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not delete table"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
    
}