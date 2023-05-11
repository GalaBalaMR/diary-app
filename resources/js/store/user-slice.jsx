import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    userInfo: [],
    isLogged: false,
    notes: [],
    messages: [],
    nonConnectUsers: [],
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser(state, action) {
            state.userInfo = action.payload;
        },
        addNotes(state, action) {
            state.notes = action.payload;
        },
        addMessages(state, action) {
            state.messages = action.payload;
        },
        isLogged(state, action) {
            state.isLogged = action.payload;
        },
        updateMessage(state, action) {
            let ids = [];
            state.messages
                // .filter((message) => message.user.id == action.payload.id)
                .map((message) => {
                    ids.push(message.user.id);
                    if (message.user.id == action.payload.user.id) {
                        console.log("jel");
                        return message.chats.push(action.payload.message);
                    }
                    // console.log("pfuuu");
                    // return message;
                });

                console.log(ids.indexOf(action.payload.id) > -1);
            if (ids.indexOf(action.payload.id) > -1 === false) {
                console.log( action.payload.user);
                state.messages.push({
                    chats: [action.payload.message],
                    user:   action.payload.user
                });
                console.log()
            }
        },
        getNonConnectUsers(state, action) {
            state.nonConnectUsers = action.payload;
        },
    },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
