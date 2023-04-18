import { uiActions } from "./ui-slice";
import { userAction } from "./user-slice";
import http from "../service/Http";

export const getUserData = () => {
    return async (dispatch) => {
        // const csrf = await http.get("/sanctum/csrf-cookie");
        const login = await http
            .get("/api/get-user")
            .then((data) => {
                dispatch(userAction.addUser(data.data.user));
                dispatch(userAction.isLogged(true));
                dispatch(getMessagesData());
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
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
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
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

export const getMessagesData = () => {
    return async (dispatch) => {
        // const csrf = await http.get("/sanctum/csrf-cookie");
        const messages = await http
            .get("/api/messages")
            .then((data) => {
                dispatch(userAction.addMessages(data.data.message));
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
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
