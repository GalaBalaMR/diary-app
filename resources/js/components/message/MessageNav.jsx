import React from "react";
import Message from "../../page/user/message/MessageNavItem";

const MessageNav = (props) => {
    const onClickMessage = (id) => {
        props.onClickMessage(id)
    }
    const links = props.users.map((user) => {
        return (
            <div key={user.key} id={user.key}>
                {/* <p id={user.key} key={user.key} onClick={onClickMessage}>
                    {user.name}
                </p> */}
                <Message name={user.name} id={user.key} onClickMessage={onClickMessage} />
            </div>
        );
    });
    return <div>{links}</div>;
};

export default MessageNav;
