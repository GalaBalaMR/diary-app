import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "../page/user/Index";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import Home from "../page/Home";
import Root from "../page/Root";
import Messages from "../page/user/message/Messages";
import ChatPage from "../page/user/message/ChatPage";
import Profile from "../page/user/Profile";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <Error />,
            children: [
                { index: true, element: <Home /> },
                { path: "login", element: <Login /> },
                { path: "register", element: <Register /> },
                {
                    path: "user",
                    element: <Index />,
                    children: [
                      { index: true, element: <Profile /> },
                      { path: "messages", element: <Messages /> },
                      { path: "messages/:id", element: <ChatPage /> },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
