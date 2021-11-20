import {
    API_URL, 
    GET_ALL_TURN_BY_ID_TABLE
} from "./thunk-config";
import { turnSlice } from "../slices/slice-turn";
import { snackBarSlice } from "../slices/slice-snack-bar";

//  Get all turn by id table
export const fetchAllTurnByIdTable = (table_id) => async dispatch => {
    try {
        const response = await fetch(API_URL.concat(GET_ALL_TURN_BY_ID_TABLE.replace(':id', table_id)), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        
        if (result) {
            if (result.bill) {
                // save list turn
                dispatch(turnSlice.actions.setListTurn(result.turns));
                dispatch(turnSlice.actions.setBill(result.bill));
            } else {
                dispatch(turnSlice.actions.setListTurn([]));
                dispatch(turnSlice.actions.setBill(undefined));
            }
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Can not get result"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Fail!-fetchAllTurnByIdTable " + error}));
    }
}

