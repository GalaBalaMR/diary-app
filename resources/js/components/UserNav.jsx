import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logOutUser } from "../store/user-action";

const UserNav = (props) => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const { user } = props;

    const onClickLogOut = (e) => {
        e.preventDefault();
        dispatch(logOutUser());
        navigateTo("/");
    };

    const onClickClose =() => {
        props.onClickClose()
    }

    return (
        <div id={props.idNav} className="user-nav col-12 col-md-5">
            <Link to="" className="name">
                {user.name}
            </Link>

            <nav>
                <NavLink
                    to=""
                    end
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={onClickClose}
                >
                    Profile
                </NavLink>

                <NavLink
                    to="messages"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={onClickClose}
                >
                    Messages
                </NavLink>

                <NavLink
                    to="todoes"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={onClickClose}
                >
                    To Do
                </NavLink>

                <NavLink
                    to="diary"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={onClickClose}
                >
                    Diary
                </NavLink>

                <a href="#" onClick={onClickLogOut}>
                    LogOut
                </a>
            </nav>
        </div>
    );
};

export default UserNav;
