import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "../components/MainNavigation";
import Notification from "../components/ui/Notification";
import { getToDoes, getUserData } from "../store/user-action";

let initiate = true;

const Root = () => {
    const notification = useSelector((state) => state.ui.notification);
    const isLogged = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userInfo);
    const messages = useSelector((state) => state.user.messages);

    const [showNotification, setShowNotification] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (notification !== null) {
            setShowNotification(true);
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        dispatch(getUserData());
        dispatch(getToDoes());
    }, [isLogged]);

    return (
        <div className="position-relative container-fluid h-100">
            {showNotification && (
                <Notification
                    status={notification.message}
                    title={notification.title}
                    message={notification.status}
                />
            )}
            {!isLogged && <MainNavigation />}

            <div id="outlet" className={ isLogged ? "h-100" : "h-auto"} >
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
