import React from "react";
import { Link} from "react-router-dom";

import MessageIcon from "@mui/icons-material/Message";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useDispatch } from "react-redux";
import { getMessagesData } from "../../store/user-action";

const NewNotifications = (props) => {
    const dispatch = useDispatch();

    const reloadMessages = (path) => {
        props.onClose();
        dispatch(getMessagesData());
    };

    const { notifications } = props;

    
    const notificationsList = notifications.map((notif) => {
        let icon = <AgricultureIcon />;
        if (notif.kind == "message") {
            icon = <MessageIcon />;
            return (
                <li key={notif.id} className="alert alert-success">
                    <Link
                        to={"/user/messages/" + notif.user.id}
                        onClick={()=> reloadMessages("/user/messages/" + notif.user.id)}
                    >
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
                <a href="">
                    <span className="icon me-3">{icon}</span>
                    <span>{notif.kind} </span>
                    {notif.title}{" "}
                </a>
            </li>
        );
    });

    return (
        <div className="modal-notification">
            <p>Notifications</p>
            <ul className="list-group">{notificationsList}</ul>
            <Link to="/user/notifications">All notifications</Link>
        </div>
    );
};

export default NewNotifications;
