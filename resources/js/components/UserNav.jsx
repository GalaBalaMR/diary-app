import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOutUser } from "../store/user-action";

const UserNav = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const onClickLogOut = (e) => {
        e.preventDefault();
        dispatch(logOutUser());
        navigateTo("/");
    };

    return (
        <nav>
            <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Home
            </NavLink>

            <NavLink
                to="messages"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Messages
            </NavLink>
            <a href="#" onClick={onClickLogOut}>
                LogOut
            </a>
        </nav>
    );
};

export default UserNav;
