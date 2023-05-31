import http from "../service/Http";
import { notificationAction } from "./notification-slice";

export const getNotification = () => {
    return async (dispatch) => {
        // const csrf = await http.get("/sanctum/csrf-cookie");
        const login = await http
            .get("/api/notifications")
            .then((response) => {
                dispatch(
                    notificationAction.addNotification(
                        response.data.notifications
                    )
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const getNotificationUndisplayed = () => {
    return async (dispatch) => {
        // const csrf = await http.get("/sanctum/csrf-cookie");
        const login = await http
            .get("/api/notification/new")
            .then((response) => {
                dispatch(
                    notificationAction.addNotificationUndisplayed(
                        response.data.notifications
                    )
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const changeUndisplayedToDisplayed = () => {
    return async (dispatch) => {
        // const csrf = await http.get("/sanctum/csrf-cookie");
        const login = await http
            .get("/api/notification/displayed")
            .then((response) => {
                dispatch(getNotificationUndisplayed())
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
