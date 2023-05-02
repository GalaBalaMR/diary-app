import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import UserNav from "../../components/UserNav";

const Index = (props) => {
    const isLogged = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userInfo);

    return (
        <div id="user-interface">
            {isLogged &&  (
                <div className="logged d-flex">
                    <UserNav user={user} />
                    <div id="user-outlet">
                        <Outlet />
                    </div>
                </div>
            )}
            { !isLogged && <div className="not-logged"><p>You are not logged in.</p><Link to="/login">Log in</Link></div>}
        </div>
    );
};

export default Index;
