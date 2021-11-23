import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: undefined,
    },
    reducers: {
      setSocket: (state, action) => {
        return {
            ...state,
            socket: action.payload
        }
      },
    },
  })