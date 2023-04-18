import React from "react";
import { useSelector } from "react-redux";
import Welcome from "../components/Welcome";

const Home = () => {
    const isLogged = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.userInfo);

    return (
        <div id="home">
            <Welcome/>
        </div>
    );
};

export default Home;
