import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "../components/MainNavigation";
import Notification from "../components/ui/Notification";
import { getUserData } from "../store/user-action";

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
        if (initiate === true) {
            initiate = false;
            dispatch(getUserData());
        }
    }, [dispatch]);
    
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


            <div id="outlet" className="h-100">
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
