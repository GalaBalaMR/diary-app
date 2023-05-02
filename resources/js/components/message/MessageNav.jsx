import React, { useState } from "react";
import MessageNavItem from "../../page/user/message/MessageNavItem";

const MessageNav = (props) => {
    const [messageId, setMessageId] = useState(0);
    const onClickMessage = (id) => {
        props.onClickMessage(id);
        setMessageId(id);
    };

    const onClickActive = () => {};

    let active = "";

    const links = props.users.map((user) => {
        if (messageId === user.key) {
            active = " active";
        } else {
            active = "";
        }
        return (
            <div className={"item" + active} key={user.key} id={user.key}>
                <MessageNavItem
                    name={user.name}
                    id={user.key}
                    onClickMessage={onClickMessage}
                    onClick={onClickActive}
                />
            </div>
        );
    });
    return <div className="messages-nav">{links}</div>;
};

export default MessageNav;
