import { createSlice } from '@reduxjs/toolkit';

export const menuFormSlice = createSlice({
    name: 'account-form',
    initialState: {
        menu: {},
        add_menu: {
          open: 0,
          type: "add",
        },
        delete_menu: 0
    },
    reducers: {
        setMenu: (state, action) => {
            return {
                ...state,
                menu: action.payload
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
        }
    }
})