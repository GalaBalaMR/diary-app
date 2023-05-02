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

    return (
        <div id="user-nav" className="col-3">
            <Link to="" className="name">
                {user.name}
            </Link>

            <nav>
                <NavLink
                    to=""
                    end
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Profile
                </NavLink>

                <NavLink
                    to="messages"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Messages
                </NavLink>

                <NavLink
                    to="todoes"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    To Do
                </NavLink>

                <NavLink
                    to="diary"
                    className={({ isActive }) => (isActive ? "active" : "")}
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
