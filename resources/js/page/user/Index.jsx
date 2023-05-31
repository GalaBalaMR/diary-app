import React, { isValidElement, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

import MenuIcon from "@mui/icons-material/Menu";
import UserNav from "../../components/UserNav";
import Modal from "../../components/ui/Modal";
import NewNotifications from "../../components/notifications/NewNotifications";
import { changeUndisplayedToDisplayed } from "../../store/notification-action";

const Index = (props) => {
    const dispatch = useDispatch()
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const isLogged = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userInfo);
    const notificationsUndisplayed = useSelector(
        (state) => state.notification.notificationUndisplayed
    );

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

    const onClickShowModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const onClickHideModal = () => {
        setShowModal(false);
        dispatch(changeUndisplayedToDisplayed())
    };

    return (
        <div id="user-interface">
            {isLogged && (
                <div className="logged row">
                    <a id="notification" onClick={onClickShowModal}>
                        <CircleNotificationsIcon fontSize="large" />
                        <span className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger">
                            {notificationsUndisplayed.length == 0
                                ? ""
                                : notificationsUndisplayed.length}
                        </span>
                    </a>
                    <div id="nav-icon">
                        <a href="" onClick={onClickShow}>
                            <MenuIcon fontSize="large" />
                        </a>
                    </div>
                    <UserNav
                        user={user}
                        idNav={visibleMenu ? "hidden" : ""}
                        onClickClose={onClickLink}
                    />
                    <div className="col-12 col-md-6 container" id="user-outlet">
                        <Outlet />
                    </div>

                    {showModal && <Modal onClose={onClickHideModal}><NewNotifications notifications={notificationsUndisplayed} onClose={onClickHideModal}/></Modal>}
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
