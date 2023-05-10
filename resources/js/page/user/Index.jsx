import React, { isValidElement, useEffect, useState } from "react"; 
import { useMediaQuery } from "react-responsive";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import MenuIcon from "@mui/icons-material/Menu";
import UserNav from "../../components/UserNav";

const Index = (props) => {
    const [visibleMenu, setVisibleMenu] = useState(false);
    const isLogged = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userInfo);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });

    // // if is mobile take back id hidden(hide menu)
    useEffect(() => {
        if (isTabletOrMobile === false) {
            setVisibleMenu(false);
        }
    }, [isTabletOrMobile]);

    const onClickShow = (e) => {
        e.preventDefault();
        setVisibleMenu(!visibleMenu);
    };

    const onClickLink = () => {
        setVisibleMenu(false);
    };

    return (
        <div id="user-interface">
            {isLogged && (
                <div className="logged row">
                    <div id="nav-icon">
                        <a href="" onClick={onClickShow}>
                            <MenuIcon fontSize="large" />
                        </a>
                    </div>
                    <UserNav user={user} idNav={visibleMenu ? "hidden" : ""} onClickClose={onClickLink} />
                    <div className="col-12 col-md-6 container" id="user-outlet">
                        <Outlet />
                    </div>
                </div>
            )}
            {!isLogged && (
                <div className="not-logged">
                    <p>You are not logged in.</p>
                    <Link to="/login">Log in</Link>
                </div>
            )}
        </div>
    );
};

export default Index;
