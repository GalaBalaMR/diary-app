import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Chat = (props) => {
    const userInfo = useSelector((state) => state.user.userInfo);
    const endMessage = useRef();

    const { user, chats } = props;

    const scrollToBottom = () => {
        endMessage.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    return (
        <div id={props.id} className="chat">
            {Object.entries(chats).map((value, key) => {
                var myMessage = "";
                if (value[1].user_id === userInfo.id) {
                    myMessage = "my-message"; //if auth user is sender, add my-message
                }
                return (
                    <div key={key}>
                        <span className="text-warning ps-3">
                            {value[1].created_diff}
                        </span>
                        <p className={myMessage}>
                            {value[1].body}
                        </p>
                    </div>
                );
            })}
            <div ref={endMessage}></div>
        </div>
    );
};

export default Chat;
