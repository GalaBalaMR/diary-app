import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/user-slice";
import { updateMessageBE } from "../../store/user-action";
import useValidInput from "../../hooks/use-Valid-Input";

const ChatForm = (props) => {
    const authUser = useSelector((state) => state.user.userInfo);
    const [userId, setUserId] = useState(authUser.id);
    const [errorMessage, setErrorMessage] = useState("Add message...");
    const [receiverId, setReceiverId] = useState(props.user.id);
    const dispatch = useDispatch();

    const {
        value: bodyValue,
        isValid: isValidBody,
        hasError,
        inputHandler,
        onBlurHandler,
        reset,
    } = useValidInput((value) => value.length > 0);

    const onSubmitEvent = (e) => {
        e.preventDefault();
        if (!isValidBody) {
            setErrorMessage("Can't send empty message..");
            return;
        }

        setErrorMessage("Add message...");
        reset();

        const message = {
            body: bodyValue,
            user_id: authUser.id,
            receiver_id: props.user.id,
            created_diff: "now",
        };
        dispatch(
            userAction.updateMessage({
                user: props.user,
                message: message,
            })
        );

        dispatch(
            updateMessageBE({
                body: bodyValue,
                user_id: authUser.id,
                receiver_id: props.user.id,
            })
        );
    };
    return (
        <form onSubmit={onSubmitEvent} className="chat-form d-flex justify-content-center flex-column">
            <textarea
                type="text"
                rows="3"
                name="body"
                id="body"
                className="col-12 "
                value={bodyValue}
                onBlur={onBlurHandler}
                onChange={inputHandler}
                placeholder={errorMessage}
            />
            <input type="hidden" name="receiver_id" value={receiverId} />
            <input type="hidden" name="user_id" value={userId} />
            <button type="submit" className="col-3 m-auto btn-cstm-orange">Send</button>
        </form>
    );
};

export default ChatForm;
