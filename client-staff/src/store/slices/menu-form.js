import { createSlice } from '@reduxjs/toolkit';

export const menuFormSlice = createSlice({
    name: 'menu-form',
    initialState: {
        menu: undefined,
        add_menu: {
          open: 0,
          type: "add",
        },
        delete_menu: 0,
        image_menu: 0,
        list_menu: undefined,
        pagination: {
            totalItems: undefined,
            totalPages: undefined,
            currentPage: undefined
        }
    },
    reducers: {
        setMenu: (state, action) => {
            return {
                ...state,
                menu: action.payload
            }
        },
        setListMenu: (state, action) => {
            return {
                ...state,
                list_menu: action.payload.menus, 
                pagination: {
                    totalItems: action.payload.totalItems,
                    totalPages: action.payload.totalPages,
                    currentPage: action.payload.currentPage
                }
            }
        },
        setAddMenu: (state, action) => {
            return {
                ...state,
                add_menu: action.payload
            }
        },
        setDeleteMenu: (state, action) => {
            return {
                ...state,
                delete_menu: action.payload
            }
        },
        setImageMenu: (state, action) => {
            return {
                ...state,
                image_menu: action.payload
            }
        }
    }
})