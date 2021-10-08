import { createSlice } from '@reduxjs/toolkit';

export const historyFormSlice = createSlice({
    name: 'history-form',
    initialState: {
        turn: undefined,
        list_turn: undefined,
        show_more: undefined,
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
                list_turn: action.payload,
            }
        },
        setShowMore: (state, action) => {
            return {
                ...state,
                show_more: action.payload,
            }
        }
    }
})