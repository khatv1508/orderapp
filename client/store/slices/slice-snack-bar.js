import { createSlice } from '@reduxjs/toolkit';

export const snackBarSlice = createSlice({
    name: 'snack-bar',
    initialState: {
        isOpen: undefined,
        message: undefined
    },
    reducers: {
        setSnackBar: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    isOpen: {},
                    message: action.payload.message
                }
            } 
            
            return {
                ...state,
                isOpen: undefined,
                message: undefined
            }
        }
    }
})