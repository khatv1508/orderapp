import {
    API_URL, 
    GET_ALL_FOOD_TYPE,
    GET_ALL_FOOD_TYPE_BY_ID
} from "./thunk-config";

import { foodTypeSlice } from "../slices/slice-food-type";

//  Get all menu
export const fetchAllFoodType = () => async dispatch => {
    try {
        const response = await fetch(API_URL.concat(GET_ALL_FOOD_TYPE), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const result = await response.json();
        if (result) {
            // save list menu
            dispatch(foodTypeSlice.actions.setListFoodType(result));
        }
    } catch (error) {
        
    }
}