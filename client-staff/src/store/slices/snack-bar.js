import { createSlice } from '@reduxjs/toolkit';

export const snackBarSlice = createSlice({
    name: 'snack-bar',
    initialState: {
        isOpen: 0,
        severity: "info",
        message: ""
    },
    reducers: {
        setOpen: (state, action) => {
            return {
                ...state,
                isOpen: action.payload
            }
        },
        setContent: (state, action) => {
            return {
                ...state,
                severity: action.payload.severity,
                message: action.payload.message
            }
        }
    }
})