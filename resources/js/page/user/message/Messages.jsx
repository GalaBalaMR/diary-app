import React, { useState } from "react";
import { useSelector } from "react-redux";
import Chat from "../../../components/message/Chat";
import { Link } from "react-router-dom";

const Messages = () => {
    const [userArr, setUserArr] = useState([]);
    const messages = useSelector((state) => state.user.messages);
    const authUser = useSelector((state) => state.user.userInfo);
    const [message, setMessage] = useState(messages);

    function getWordStr(str) {
        return str.split(/\s+/).slice(0, 3).join(" ");
    }

    const names = messages.map((mess, key) => (
        <li key={mess.user.id}>
            <Link to={"" + mess.user.id}>
                <span style={{ backgroundImage: `url(${mess.user.thumb})` }}>
                </span>
                <div className="info">
                    <p className="name">{mess.user.name}</p>
                    {/* add just three word from last message */}
                    {mess.chats.map((chat, i, arr) => {
                        if (arr.length - 1 === i) {
                            // last one
                            if(chat.user_id == authUser.id){
                                return (
                                    <p className="message" key={chat.id}><span className="text-warning">You:</span> {getWordStr(chat.body)}...</p>
                                );
                            }else{
                                return (
                                    <p className="message" key={chat.id}>{getWordStr(chat.body)}...</p>
                                );
                                
                            }
                        }
                    })}
                </div>
            </Link>
        </li>
    ));

    console.log(messages);

    return (
        <div id="messages" className="d-flex flex-column">
            <h2 className="">Messages</h2>
            <ul className="col-12">{names}</ul>
        </div>
    );
};

export default Messages;
