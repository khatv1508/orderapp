import {
    API_URL, 
    POST_BILL_ORDER,
    PUT_BILL_ORDER
} from "./thunk-config";
import { snackBarSlice } from "../slices/slice-snack-bar";
import { menuSlice } from "../slices/slice-menu";
import { fetchAllTurnByIdTable } from "../thunk/thunk-turn";

//  Insert Bill Order
export const fetchInsertBill = () => async (dispatch, getState) => {
    try {
        // lay list order tu state 
        const state = getState();
        const list_order = state.menu.list_order.arr;
        // const current_food_type = state.menu.current_food_type;
        const bill = state.turn.bill;
        // for list order
        let tmpDetails = list_order.map((obj) => {
            return { 
                menu_id: obj.menu_id,
                quantity: obj.qty,
                amount: obj.amount
            }   
        })
        // lay table tu state
        const table = state.setting.table;

        // 
        const response = await fetch(API_URL.concat(POST_BILL_ORDER), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bill_id: bill ? bill.id : undefined,
                account_id: 2,
                table_id: table,
                details: tmpDetails
            }),
        });
    
        const result = await response.json();
        if (result) {
            // 
            dispatch(menuSlice.actions.setListOrder(undefined));
            dispatch(fetchAllTurnByIdTable());
            // 
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Can not insert"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Fail! " + error}));
    }
}

//  Update Bill Order
export const fetchUpdateBill = () => async (dispatch) => {
    try {
        const state = getState();
        const bill = state.turn.bill;
        // 
        const response = await fetch(API_URL.concat(PUT_BILL_ORDER.replace(":id", bill.bill_id)), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // 
            dispatch(menuSlice.actions.setListOrder(undefined));
            dispatch(fetchAllTurnByIdTable());
            // 
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Can not update"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Fail! " + error}));
    }
}