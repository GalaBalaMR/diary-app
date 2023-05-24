import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { getNoConnectUser } from "../../../store/user-action";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChatForm from "../../../components/message/ChatForm";

const MessagesNew = () => {
    const [users, setUsers] = useState();
    const [current, setCurrent] = useState(0);
    const newUsers = useSelector((state) => state.user.nonConnectUsers);
    const messages = useSelector((state) => state.user.messages);
    const [formUser, setFormUser] = useState(null);
    const dispatch = useDispatch();
    const length = newUsers.length;

    useEffect(() => {
        dispatch(getNoConnectUser());
    }, []);

    // useEffect(()=>{
    //   setFormUser(newUsers[0])
    // }, [newUsers])

    const onClickPrev = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
        setFormUser(null);
    };

    const onClickNext = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
        setFormUser(null);
    };
    
    const onClickSetUser = (user) => () => {
        setFormUser(user);
    };

    function getWordStr(str) {
        if (str === null) {
            return;
        }
        return str.split(/\s+/).slice(0, 15).join(" ");
    }

    const userCards = newUsers.map((user, key) => {
        let isActive = "";
        if (key === current) {
            isActive = "isActive ";
        }

        return (
            <div
                key={user.id}
                className={isActive + "card h-100 col-10 col-md-9 m-auto"}
            >
                <img className="card-img-top" src={user.thumb} />
                <div className="card-body">
                    <Link to={"/user/profile/" + user.id} state={user} >
                        <h5 className="card-title">{user.name}</h5>
                    </Link>
                    <p className="card-text">
                        {getWordStr(user.description)}...
                    </p>
                    <a
                        onClick={onClickSetUser(user)}
                        href="#"
                        className="btn btn-primary "
                    >
                        Start chat...
                    </a>
                </div>
            </div>
        );
    });

    return (
        <div className="messages-new">
            <h1 className="text-center my-3">Find new user</h1>

            <div className="d-block d-sm-flex justify-content-center align-items-center">
                <div className="control d-flex d-sm-none justify-content-center">
                    <span onClick={onClickPrev}>
                        <ArrowBackIosIcon fontSize="large" />
                    </span>
                    <span onClick={onClickNext}>
                        <ArrowForwardIosIcon fontSize="large" />
                    </span>
                </div>
                <span className="d-none d-sm-block" onClick={onClickPrev}>
                    <ArrowBackIosIcon fontSize="large" />
                </span>
                {userCards}
                <span className="d-none d-sm-block" onClick={onClickNext}>
                    <ArrowForwardIosIcon fontSize="large" />
                </span>
            </div>

            <div
                className="col-10 col-md-9 m-auto pb-5"
                id="form-chat"
            >
                {formUser && <ChatForm user={formUser} />}
            </div>
        </div>
    );
};

export default MessagesNew;

// export const newUserLoader = ({ request }) => {

// }
