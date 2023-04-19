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
    // console.log(isLogged)
    
    return (
        <div className="container">
            {!isLogged && <MainNavigation />}

            {showNotification && (
                <Notification
                    status={notification.message}
                    title={notification.title}
                    message={notification.status}
                />
            )}

            <div id="outlet">
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
