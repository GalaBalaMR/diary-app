import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { logOutUser } from "../store/user-action";

const MainNavigation = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.user.isLogged);

    const onClickLogOut = async () => {
        dispatch(logOutUser());
        navigateTo("/");
    };

    return (
        <nav>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Domov
            </NavLink>
            <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Login
            </NavLink>
            <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Register
            </NavLink>

            {isLogged && (
                <a href="#" onClick={onClickLogOut}>
                    Log out
                </a>
            )}
        </nav>
    );
};

export default MainNavigation;
