import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import uiReducer from "./ui-slice";
import notificationReducer from "./notification-slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
        notification: notificationReducer,
    },
    // solve problem with non serializable value
    // middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({
    //   serializableCheck: false,
    // }),
});

export default store;
