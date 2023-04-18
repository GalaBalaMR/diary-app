import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import UserNav from "../../components/UserNav";

const Index = (props) => {
    const isLogged = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userInfo);

    return (
        <div>
            <UserNav/>

            <div id="user-outlet">
                <Outlet />
            </div>
        </div>
    );
};

export default Index;
