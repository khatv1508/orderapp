import { createSlice } from '@reduxjs/toolkit';

export const tableFormSlice = createSlice({
    name: 'table-form',
    initialState: {
        table: undefined,
        add_table: 0,
        delete_table: 0
    },
    reducers: {
        setTable: (state, action) => {
            return {
                ...state,
                table: action.payload
            }
        },
        setAddTable: (state, action) => {
            return {
                ...state,
                add_table: action.payload
            }
        },
        setDeleteTable: (state, action) => {
            return {
                ...state,
                delete_table: action.payload
            }
        }
    }
})