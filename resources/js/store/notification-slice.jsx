import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    notificationAll: [],
    notificationUndisplayed: [],
};
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification(state, action) {
            state.notificationAll = action.payload;
        },
        addNotificationUndisplayed(state, action) {
            state.notificationUndisplayed = action.payload;
        },
        removeUndisplayed(state, action) {
            const undisplayedIndex = state.notificationUndisplayed.findIndex(
                (notif) => notif.id === action.payload
            );
            if (undisplayedIndex !== -1) {
                state.notificationUndisplayed.splice(undisplayedIndex, 1);
            }
        },
    },
});

export const notificationAction = notificationSlice.actions;

export default notificationSlice.reducer;
