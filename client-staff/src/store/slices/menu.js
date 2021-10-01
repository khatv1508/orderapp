import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
      active_menu: "home",
    },
    reducers: {
      setActiveMenu: (state, action) => {
        return {
            ...state,
            active_menu: action.payload
        }
      },
    },
  })