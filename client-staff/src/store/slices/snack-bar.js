import { createSlice } from '@reduxjs/toolkit';

export const snackBarSlice = createSlice({
    name: 'snack-bar',
    initialState: {
        isOpen: undefined,
        severity: undefined,
        message: undefined
    },
    reducers: {
        setSnackBar: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    isOpen: {},
                    severity: action.payload.severity,
                    message: action.payload.message
                }
            } 
            
            return {
                ...state,
                isOpen: undefined,
                severity: undefined,
                message: undefined
            }
        }
    }
})