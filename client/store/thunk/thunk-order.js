import {
    API_URL, 
    POST_BILL_ORDER,
} from "./thunk-config";
import { snackBarSlice } from "../slices/slice-snack-bar";
import { menuSlice } from "../slices/slice-menu";
import { fetchAllTurnByIdTable } from "../thunk/thunk-turn";
import { turnSlice } from "../slices/slice-turn";

// create bill
export const fetchCreateBill = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const table = state.setting.table;
        const response = await fetch(API_URL.concat(POST_BILL_ORDER), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bill_id: null,
                account_id: 2,
                table_id: table,
                details: []
            }),
        });
        const result = await response.json();
        // 
        if (result && result.content) {
            dispatch(turnSlice.actions.setBill(result.content));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Can not create bill"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Fail!-fetchCreateBill " + error}));
    }
}

//  Insert Bill Order
export const fetchInsertBill = () => async (dispatch, getState) => {
    try {
        // lay list order tu state 
        const state = getState();
        const socketEmit = state.socket;
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
            dispatch(fetchAllTurnByIdTable(table));
            // socket emit
            socketEmit && socketEmit.socket.emit("order", "client-app");
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Can not insert"}));
        }
    } catch (error) {
        console.log(error);
        dispatch(snackBarSlice.actions.setSnackBar({isOpen: true, message: "Fail!-fetchInsertBill " + error}));
    }
}