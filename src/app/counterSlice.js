import {createSlice} from "@reduxjs/toolkit";
import {act} from "react-dom/test-utils";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
            if (state.value == 10) {
                state.value = "MAX_NUMBER_REACHED";

            }
        },

        multiply: (state) => {
            state.value += state.value;
        },

        decrement: (state) => {
            state.value -= 1;
        },

        incrementByAmount: (state, action) => {
           state.value += action.payload;


        },
    },
})

export const {increment, multiply, decrement, incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;