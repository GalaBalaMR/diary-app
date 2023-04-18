import { createSlice } from "@reduxjs/toolkit";

const initialState = { notification: null }

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        notification(state, action){
            state.notification = null;
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            };
        }
    }

})

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
