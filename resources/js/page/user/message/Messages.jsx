import React, { useState } from "react";
import { useSelector } from "react-redux";
import MessageNav from "../../../components/message/MessageNav";

const Messages = () => {
    const [userArr, setUserArr] = useState([]);
    const messages = useSelector((state) => state.user.messages);
    const [message, setMessage] = useState();
    var users = [...userArr];
    const usersName = messages.map((mess, key) =>
        users.push({ name: mess.user.name, key: key })
    );

    // console.log(messages);
    const messagesComponents = messages.map((mes, key) => {
        return (
            <div id={key} key={key} className="border">
                {key}
                {Object.entries(mes.chats).map((value, key) => {
                    return (
                        <p key={key}>
                            {value[1].body}
                            {value[1].created_at}
                        </p>
                    );
                })}
                <p className="text-warning">{mes.user.name}</p>
            </div>
        );
    });

    const onClickShowMessages = (id) => {
        
        setMessage(messagesComponents[id]);
    };

    return (
        <div>
            <MessageNav users={users} onClickMessage={onClickShowMessages}/>
            <p>Messages</p>
            {/* {messagesComponents[0]} */}
            {message ? message : messagesComponents[0]}
        </div>
    );
};

export default Messages;
