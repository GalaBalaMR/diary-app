import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    userInfo: [],
    isLogged: false,
    notes: [],
    messages: [],
    nonConnectUsers: [],
    todoes: [],
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
                        return message.chats.push(action.payload.message);
                    }
                    return message;
                });

            // if user id is not in messeges, make new messege with user and chat
            if (ids.indexOf(action.payload.user.id) > -1 === false) {
                state.messages.push({
                    chats: [action.payload.message],
                    user: action.payload.user,
                });
            }
        },
        getNonConnectUsers(state, action) {
            state.nonConnectUsers = action.payload;
        },
        addToDoes(state, action) {
            state.todoes = action.payload;
        },
        updateTodoes(state, action) {
            state.todoes.map((item) => {
                if (item.date == action.payload.todo.date) {
                    item.todo.map((todo) => {
                        if (todo.id == action.payload.todo.id) {
                            return Object.assign(todo, action.payload.todo);
                        }
                    });
                }
            });
        },
        addTodoes(state, action) {
            state.todoes.map((item) => {
                if (item.date == action.payload.todo.date) {
                    return item.todo.push(action.payload.todo);
                }
            });
        },
    },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
