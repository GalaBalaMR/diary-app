import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../../service/Http";

const Chat = (props) => {
    const userInfo = useSelector((state) => state.user.userInfo);
    const { chats } = props;
    const [updatedChat, setUpdatedChat] = useState(chats);
    const dispatch = useDispatch();
    const endMessage = useRef();

    const fetchData = async () => {
        await http
            .get("/api/messages/" + props.id + "/updated-chat")
            .then((response) => {
                setUpdatedChat(response.data.message);
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(
                        uiActions.notification({
                            status: "error",
                            title: error.response.status,
                            message: error.response.data.message,
                        })
                    );
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    };

    const scrollToBottom = () => {
        endMessage.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        setUpdatedChat(chats);
    }, [chats]);

    useEffect(() => {
        scrollToBottom();
    }, [updatedChat]);

    useEffect(() => {
        const timer = setInterval(() => {
            fetchData();
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div id={props.id} className="chat">
            {Object.entries(updatedChat).map((value, key) => {
                var myMessage = "";
                if (value[1].user_id === userInfo.id) {
                    myMessage = "my-message"; //if auth user is sender, add my-message
                }
                return (
                    <div key={key}>
                        <span className="text-warning ps-3">
                            {value[1].created_diff}
                        </span>
                        <p className={myMessage}>{value[1].body}</p>
                    </div>
                );
            })}
            <div ref={endMessage}></div>
        </div>
    );
};

export default Chat;
