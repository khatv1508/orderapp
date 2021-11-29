import {
    API_URL,
    GET_ALL_TURN,
    PUT_UPDATE_TURN
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

        const response = await fetch(typeof status !== "undefined" 
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
            if (typeof status !== "undefined" && status === 0) {
                dispatch(historyFormSlice.actions.setListNewOrder(result));
            } else {
                dispatch(historyFormSlice.actions.setListTurn(result));
            }
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: "Get all bill success!"}));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not get result"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}

// Update turn
export const fetchUpdateTurn = (id, status) => async (dispatch, getStore) => {
    try {
        const data = {
            status: status,
        } 
        let reqParam = encodeQueryData(data);
        const state = getStore();
        const { socket } = state.socket;
        const {list_turn} = state.historyForm;

        const response = await fetch(typeof status === "undefined" 
        ? API_URL.concat(PUT_UPDATE_TURN.replace(':id', id)) 
        : API_URL.concat(PUT_UPDATE_TURN.replace(':id', id).concat("?").concat(reqParam)), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: result.message}));
            if (typeof status !== "undefined") {
                dispatch(fetchAllTurn(0));
                socket.emit("chef");
            } else {
                let target = list_turn.filter((item) => item.id === id)[0];
                socket.emit("finish", [target.bill.table_id, target.num]);
            }
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not update turn"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
    
}