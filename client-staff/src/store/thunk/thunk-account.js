import {
    API_URL,
    GET_ALL_ACCOUNT,
    POST_ADD_ACCOUNT,
    PUT_UPDATE_ACCOUNT,
    PUT_RESET_PASS_ACCOUNT,
    POST_CHECK_OLD_PASS,
    DELETE_ACCOUNT
} from "./thunk-config";
import { accountFormSlice } from "../slices/account-form";
import { snackBarSlice } from "../slices/snack-bar";

//  Get all account
export const fetchAllAccount = () => async dispatch => {
    try {
        const response = await fetch(API_URL.concat(GET_ALL_ACCOUNT), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // save list account
            dispatch(accountFormSlice.actions.setListAccount(result));
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: "Get all account success!"}));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not get result"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}

//  Add account
export const fetchAddAccount = (account) => async dispatch => {
    try {
        const data = {
            account_name: account.account_name,
            account_pass: account.account_pass,
            role_id: account.role_id,
            account_status: account.account_status
        }
        const response = await fetch(API_URL.concat(POST_ADD_ACCOUNT), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    
        const result = await response.json();
        if (result) {
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: result.message}));
            dispatch(fetchAllAccount());
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not add account"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}

//  Update account
export const fetchUpdateAccount = (account) => async dispatch => {
    try {
        const data = {
            id: account.id,
            account_name: account.account_name,
            account_pass: account.account_pass,
            role_id: account.role_id,
            account_status: account.account_status
        }
        const response = await fetch(API_URL.concat(PUT_UPDATE_ACCOUNT.replace(':id', account.id)), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    
        const result = await response.json();
        if (result) {
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: result.message}));
            dispatch(fetchAllAccount());
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not update account"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}

//  Reset password account
export const fetchResetPassAccount = (account) => async dispatch => {
    try {
        // Check old pass
        let response = await fetch(API_URL.concat(POST_CHECK_OLD_PASS.replace(':id', account.id)), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account_pass: account.old_pass
            }),
        });
    
        let result = await response.json();
        if (result) {
            if (result.message === "true") {
                response = await fetch(API_URL.concat(PUT_RESET_PASS_ACCOUNT.replace(':id', account.id)), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({account_pass: account.account_pass}),
                });
            
                const result = await response.json();
                if (result) {
                    // show snack-bar
                    dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: result.message}));
                    dispatch(fetchAllAccount());
                } else {
                    dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not reset password account"}));
                }
            } else {
                // show snack-bar
                dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: result.message}));
            }
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Incorrect password"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}

//  Delete account
export const fetchDeleteAccount = (id) => async dispatch => {
    try {
        const response = await fetch(API_URL.concat(DELETE_ACCOUNT.replace(':id', id)), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // show snack-bar
            dispatch(snackBarSlice.actions.setSnackBar({severity: "success", message: result.message}));
        } else {
            dispatch(snackBarSlice.actions.setSnackBar({severity: "warning", message: "Can not delete account"}));
        }
    } catch (error) {
        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "Fail! " + error}));
    }
}