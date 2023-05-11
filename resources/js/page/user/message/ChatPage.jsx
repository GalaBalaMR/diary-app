import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Chat from "../../../components/message/Chat";
import ChatForm from "../../../components/message/ChatForm";

const ChatPage = () => {
    const [chat, setChat] = useState(null);
    const [user, setUser] = useState([]);
    const { id } = useParams();
    const messages = useSelector((state) => state.user.messages);

    const makeChat = () => {
      const filteredChat = messages.filter((message) => message.user.id == id)

      const chatEl = filteredChat.map((mes, key) => (
          <Chat key={key} user={mes.user} chats={mes.chats} />
      ));
      
      setChat(chatEl)
      if(filteredChat.length > 0 ){
        setUser(filteredChat[0].user)
      }
      console.log()

      // return filteredChat
    }
    useEffect(()=> {
      makeChat()
    }, [messages])

console.log(messages)
    return (
        <div className="h-100">
          <Link to={"/user/profile/" + user.id} state={user}>
            <h2 className="text-center">{user && user.name}</h2>
          </Link>
            {chat}
            <ChatForm user={user} />
        </div>
    );
};

export default ChatPage;
