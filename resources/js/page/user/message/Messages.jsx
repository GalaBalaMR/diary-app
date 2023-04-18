import React, { useState } from "react";
import { useSelector } from "react-redux";
import MessageNav from "./MessageNav";

const Messages = () => {
    const [userArr, setUserArr] = useState([]);
    const messages = useSelector((state) => state.user.messages);
    const [message, setMessage] = useState();


    var users = [...userArr];
    const usersName = messages.map((mess, key) =>
        users.push({ name: mess.user.name, key: key })
    );

    console.log(message)

    return (
        <div>
            <MessageNav users={users} />
            <p>Messages</p>
        </div>
    );
};

export default Messages;
