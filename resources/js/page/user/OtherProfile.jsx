import React from "react";
import { useLocation } from "react-router-dom";

const OtherProfile = (props) => {
    const location = useLocation()
    const user = location.state;
    return <div className="other-profile text-center mt-5">
        <h1>{user.name}</h1>
        <p>{user.description}</p>

    </div>;
};

export default OtherProfile;
