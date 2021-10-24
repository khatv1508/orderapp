import { createSlice } from '@reduxjs/toolkit';

export const foodTypeSlice = createSlice({
    name: 'food-type',
    initialState: {
        food_type: undefined,
        list_food_type: undefined,
    },
    reducers: {
        setFoodType: (state, action) => {
            return {
                ...state,
                food_type: action.payload
            }
        },
        setListFoodType: (state, action) => {
            return {
                ...state,
                list_food_type: action.payload
            }
        }
    }
})