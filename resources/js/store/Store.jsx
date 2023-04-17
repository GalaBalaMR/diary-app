import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice"
import uiReducer from "./ui-slice"

const store = configureStore({
    reducer: {  user: userReducer,
                ui: uiReducer},
    // solve problem with non serializable value
    // middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({
    //   serializableCheck: false,
    // }),
})

export default store;