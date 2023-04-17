import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { userAction } from "../store/user-slice";

const Home = () => {
    const isLogged = useSelector((state) => state.user.userInfo);
    console.log(isLogged);
    return (
        <div id="home">
            <div>Home</div>
            { isLogged && <p>Welcome </p>}
        </div>
    );
};

export default Home;
