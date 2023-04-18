import { createSlice } from "@reduxjs/toolkit";

const initialState = { userInfo: [], isLogged: false, notes: [], messages: [] };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action){
        state.userInfo = action.payload;
    },
    addNotes(state, action){
        state.notes = action.payload;
    },
    addMessages(state, action){
        state.messages = action.payload;
    },
    isLogged(state, action){
        state.isLogged = action.payload;
    },
  },
});


export const userAction = userSlice.actions;

export default userSlice.reducer;