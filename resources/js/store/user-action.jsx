import { uiActions } from "./ui-slice";
import { userAction } from "./user-slice";
import http from "../service/Http";

export const getUserData = () => {
    return async (dispatch) => {
        // const csrf = await http.get("/sanctum/csrf-cookie");
        const login = await http
            .get("/api/get-user")
            .then((data) => {
                if (data.data.status === "success") {
                    dispatch(userAction.addUser(data.data.user));
                    dispatch(userAction.isLogged(true));
                    dispatch(getMessagesData());
                    // dispatch(getToDoes());
                }
            })
            .catch((error) => {
                dispatch(userAction.isLogged(false));

                if (error.response) {
                    console.log(error.response.data);
                    // dispatch(
                    //     uiActions.notification({
                    //         status: "error",
                    //         title: error.response.status,
                    //         message: error.response.data.message,
                    //     })
                    // );
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    };
};

export const logOutUser = () => {
    return async (dispatch) => {
        const csrf = await http.get("/sanctum/csrf-cookie");
        const logout = await http
            .get("/api/logout")
            .then((data) => {
                dispatch(userAction.isLogged(false));
                dispatch(
                    uiActions.notification({
                        status: "success",
                        title: "Successfully logged out",
                        message: "Thank you for coming, have a nice day",
                    })
                );
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(
                        uiActions.notification({
                            status: "error",
                            title: error.response.status,
                            message: error.response.data.message,
                        })
                    );
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    };
};

// MESSAGE-----------------------------------------------------------------

export const getMessagesData = () => {
    return async (dispatch) => {
        // const csrf = await http.get("/sanctum/csrf-cookie");
        const messages = await http
            .get("/api/messages")
            .then((data) => {
                dispatch(userAction.addMessages(data.data.message));
                // console.log(data.data.message[0][1].body)
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(
                        uiActions.notification({
                            status: "error",
                            title: error.response.status,
                            message: error.response.data.message,
                        })
                    );
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    };
};

export const updateMessageBE = (data) => {
    return async (dispatch) => {
        // const csrf = await http.get("/sanctum/csrf-cookie");
        const formData = new FormData();

        formData.append("body", data.body);
        formData.append("user_id", data.user_id);
        formData.append("receiver_id", data.receiver_id);

        const messages = await http
            .post("/api/messages", formData)
            .then((data) => {
                // console.log(data);
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(
                        uiActions.notification({
                            status: "error",
                            title: error.response.status,
                            message: error.response.data.message,
                        })
                    );
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    };
};

// export const updateChat = (id) => {
//     return async (dispatch) => {
//         // const csrf = await http.get("/sanctum/csrf-cookie");
//         const fetchData = async () => {
//             const messages = await http
//                 .get("/api/messages/" + id + "/updated-chat")
//                 .then((response) => {
//                      return response.data.message;
//                 })
//                 .catch((error) => {
//                     if (error.response) {
//                         dispatch(
//                             uiActions.notification({
//                                 status: "error",
//                                 title: error.response.status,
//                                 message: error.response.data.message,
//                             })
//                         );
//                     } else if (error.request) {
//                         // The request was made but no response was received
//                         // `error.request` is an instance of XMLHttpRequest in the
//                         // browser and an instance of
//                         // http.ClientRequest in node.js
//                         console.log(error.request);
//                     } else {
//                         // Something happened in setting up the request that triggered an Error
//                         console.log("Error", error.message);
//                     }
//                 });
//                 const data = messages.json()
//             return data;
//         };
        
//         const data = await fetchData();
//     };
// };

export const getNoConnectUser = () => {
    return async (dispatch) => {
        const users = await http
            .get("api/messages/new-user")
            .then((data) => {
                dispatch(userAction.getNonConnectUsers(data.data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(
                        uiActions.notification({
                            status: "error",
                            title: error.response.status,
                            message: error.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        uiActions.notification({
                            status: "error",
                            title: "Ooops...",
                            message: "Something went wrong....",
                        })
                    );
                }
            });

        return users;
    };
};

export const getToDoes = () => {
    return async (dispatch) => {
        const toDoes = await http
            .get("/api/todoes")
            .then((data) => {
                dispatch(userAction.addToDoes(data.data.todoes));
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    // dispatch(
                    //     uiActions.notification({
                    //         status: "error",
                    //         title: error.response.status,
                    //         message: error.response.data.message,
                    //     })
                    // );
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });

        return toDoes;
    };
};
