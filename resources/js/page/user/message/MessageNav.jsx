import React from "react";

const MessageNav = (props) => {
    const links = props.users.map((user) => {
        return (
            <a href="#" id={user.key} key={user.key}>
                {user.name}
            </a>
        );
    });
    return <div>{links}</div>;
};

export default MessageNav;
