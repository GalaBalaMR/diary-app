import React, { useState } from "react";
import { useSelector } from "react-redux";
import Chat from "../../../components/message/Chat";
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
            <Chat id={key} key={key} user={mes.user} chats={mes.chats} />
        );
    });

    const onClickShowMessages = (id) => {
        
        setMessage(messagesComponents[id]);
    };

    return (
        <div id="messages">
            <MessageNav users={users} onClickMessage={onClickShowMessages}/>
            <p>Messages</p>
            {/* {messagesComponents[0]} */}
            {message ? message : messagesComponents[0]}
        </div>
    );
};

export default Messages;
