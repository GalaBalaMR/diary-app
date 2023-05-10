import { createSlice, current } from "@reduxjs/toolkit";

const initialState = { userInfo: [], isLogged: false, notes: [], messages: [] };
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
            // const messages = state.messages;
            state.messages.filter(
                (message) => message.user.id == action.payload.id
            ).map((message) => {
                if (message.user.id == action.payload.id) {
                    return (message.chats.push(action.payload.message));
                }

                return message;
            });

            console.log(current(state.messages));
        },
    },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
