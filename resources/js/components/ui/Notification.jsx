import React from "react";

const Notification = (props) => {
    return (
        <div className={'notification '+props.message}>
            <p>{props.title}</p>
            <p>{props.status}</p>
        </div>
    );
};

export default Notification;
