import { createSlice } from "@reduxjs/toolkit";

const initialState = { userInfo: true, isLogged: false };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action){
        state.userInfo = action.payload;
    },
    isLogged(state, action){
        state.isLogged = action.payload;
    },
    getUser(state, action){
        
    }
  },
});


export const userAction = userSlice.actions;

export default userSlice.reducer;