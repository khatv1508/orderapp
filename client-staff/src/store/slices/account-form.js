import { createSlice } from '@reduxjs/toolkit';

export const accountFormSlice = createSlice({
    name: 'account-form',
    initialState: {
        account: {},
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