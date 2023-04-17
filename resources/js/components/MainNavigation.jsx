import React from "react";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
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
        </nav>
    );
};

export default MainNavigation;
