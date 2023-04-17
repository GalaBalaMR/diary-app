import { createSlice } from "@reduxjs/toolkit";

const initialState = { nothification: null }

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        nothification(state, action){
            state.nothification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            };
        }
    }

})

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
