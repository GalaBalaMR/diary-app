import React from "react";

const Notification = (props) => {
    return (
        <div>
            <p>{props.status}</p>
            <p>{props.title}</p>
            <p>{props.message}</p>
        </div>
    );
};

export default Notification;
