import {
    API_URL, 
    PUT_BILL_ORDER
} from "./thunk-config";
import { snackBarSlice } from "../slices/snack-bar";
import { fetchAllTableDetail } from "./thunk-table";

//  Update Bill Order
export const fetchUpdateBill = (bill_id) => async (dispatch) => {
    try {

        // 
        const response = await fetch(API_URL.concat(PUT_BILL_ORDER.replace(":id", bill_id)), {
            method: 'PUT',
        });
    
        const result = await response.json();
        if (result) {
            dispatch(fetchAllTableDetail()); 
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Can not update"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Fail!-fetchUpdateBill " + error}));
    }
}