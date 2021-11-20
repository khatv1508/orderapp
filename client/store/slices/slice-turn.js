import { createSlice } from '@reduxjs/toolkit';

export const turnSlice = createSlice({
    name: 'turn',
    initialState: {
        turn: undefined,
        list_turn: undefined,
        bill: undefined,
    },
    reducers: {
        setTurn: (state, action) => {
            return {
                ...state,
                turn: action.payload
            }
        },
        setListTurn: (state, action) => {
            return {
                ...state,
                list_turn: action.payload
            }
        },
        setBill: (state, action) => {
            return {
                ...state,
                bill: action.payload
            }
        }
    }
})