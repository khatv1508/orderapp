import {
    API_URL,
    GET_ALL_TURN,
} from "./thunk-config"
import { historyFormSlice } from "../slices/history-form";
import { snackBarSlice } from "../slices/snack-bar";
import { encodeQueryData } from "../../common/encodeQueryData";

//  Get all turn, status = 0
export const fetchAllTurn = (status) => async dispatch => {
    try {
        const data = {
            status: status,
        } 
        let reqParam = encodeQueryData(data);

        const response = await fetch(status 
            ? API_URL.concat(GET_ALL_TURN.concat("?").concat(reqParam)) 
            : API_URL.concat(GET_ALL_TURN), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // save list account
            dispatch(historyFormSlice.actions.setListTurn(result));
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: "Get all bill success!"}));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not get result"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}