import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: undefined,
        list_all_menu: undefined,
        list_menu: undefined,
        list_order: undefined, 
    },
    reducers: {
        setMenu: (state, action) => {
            return {
                ...state,
                menu: action.payload
            }
        },
        setListAllMenu: (state, action) => {
            return {
                ...state,
                list_all_menu: action.payload
            }
        },
        setListMenu: (state, action) => {
            return {
                ...state,
                list_menu: action.payload
            }
        },
        setListOrder: (state, action) => {
            return {
                ...state,
                list_order: action.payload
            }
        },
    }
})