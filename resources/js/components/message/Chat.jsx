import React from "react";
import { useSelector } from "react-redux";

const Chat = (props) => {
    const userInfo = useSelector((state) => state.user.userInfo);
    const { user, chats } = props;

    return (
        <div id={props.id} className="chat">
            {Object.entries(chats).map((value, key) => {
              var myMessage = "";
              if (value[1].user_id === userInfo.id) {
                  myMessage = "my-message";     //if auth user is sender add my-message
              }
                return (
                    <p key={key} className={myMessage}>
                        {value[1].body}
                        {value[1].user_id}
                        <span className="text-warning ps-3">
                            {value[1].created_diff}
                        </span>
                    </p>
                );
            })}
        </div>
    );
};

export default Chat;
