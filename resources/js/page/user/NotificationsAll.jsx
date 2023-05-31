import React from "react";

import MessageIcon from "@mui/icons-material/Message";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotificationsAll = (props) => {
    const notifications = useSelector(
        (state) => state.notification.notificationAll
    );

    const notificationsList = notifications.map((notif) => {
        let icon = <AgricultureIcon />;
        if (notif.kind == "message") {
            icon = <MessageIcon />;
            return (
                <li key={notif.id} className="alert alert-success">
                    <Link to={"/user/messages/" + notif.user.id} >
                        <span className="icon me-3">{icon}</span>
                        <span>{notif.user.name} </span>
                        <span>{notif.body} </span>
                    </Link>
                </li>
            );
        } else if (notif.kind == "internal") {
            icon = <SupervisorAccountIcon />;
        }
        return (
            <li key={notif.id} className={"alert alert-" + notif.status}>
                <a href="#">
                    <span className="icon me-3">{icon}</span>
                    <span>{notif.kind} </span>
                    {notif.title}{" "}
                </a>
            </li>
        );
    });
    return (
        <div className="all-notification">
            <p>Notifications</p>
            <ul className="list-group">{notificationsList}</ul>
        </div>
    );
};

export default NotificationsAll;
