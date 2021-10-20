import { createSlice } from '@reduxjs/toolkit';

export const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        table: undefined,
        list_table: undefined,
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
        }
    }
})