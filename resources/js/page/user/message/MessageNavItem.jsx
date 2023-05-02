import React from "react";

const MessageNavItem = (props) => {
    const onClickMessage = () => {
        props.onClickMessage(props.id);
    };
    return (
        <div key={props.id} onClick={onClickMessage}>
          <a href="#" >
            {props.name}
          </a>
        </div>
    );
};

export default MessageNavItem;
