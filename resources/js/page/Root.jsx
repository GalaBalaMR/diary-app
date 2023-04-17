import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const Root = () => {
    return (
        <div className="container">
            <MainNavigation/>
            <div id="outlet"><Outlet/></div>
        </div>
    );
};

export default Root;
