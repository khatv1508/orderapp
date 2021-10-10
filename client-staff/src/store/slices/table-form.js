import { createSlice } from '@reduxjs/toolkit';

export const tableFormSlice = createSlice({
    name: 'table-form',
    initialState: {
        table: undefined,
        list_table: undefined,
        list_table_detail: undefined,
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
        setListTable: (state, action) => {
            return {
                ...state,
                list_table: action.payload
            }
        },
        setListTableDetail: (state, action) => {
            return {
                ...state,
                list_table_detail: action.payload
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