import { createSlice } from '@reduxjs/toolkit';

export const accountFormSlice = createSlice({
    name: 'account-form',
    initialState: {
        account: undefined,
        list_account: undefined,
        account_login: undefined,
        add_form: {
          open: 0,
          type: "add",
        },
        reset_form: 0,
        delete_account: 0
    },
    reducers: {
        setAccount: (state, action) => {
            return {
                ...state,
                account: action.payload
            }
        },
        setListAccount: (state, action) => {
            return {
                ...state,
                list_account: action.payload
            }
        },
        setAccountLogin: (state, action) => {
            return {
                ...state,
                account_login: action.payload
            }
        },
        setAddForm: (state, action) => {
            return {
                ...state,
                add_form: action.payload
            }
        },
        setResetForm: (state, action) => {
            return {
                ...state,
                reset_form: action.payload
            }
        },
        setDeleteAccount: (state, action) => {
            return {
                ...state,
                delete_account: action.payload
            }
        }
    }
})