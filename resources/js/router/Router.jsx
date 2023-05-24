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
import MessagesNew from "../page/user/message/MessagesNew";
import { useDispatch } from "react-redux";
import OtherProfile from "../page/user/OtherProfile";
import Calendar from "../page/user/Todo/Calendar";
import Diary from "../page/user/diary/Diary";

const Router = () => {
    const dispatch = useDispatch()
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            // errorElement: <Error />,
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
                      { path: "messages/new", element: <MessagesNew /> },
                      { path: "messages/:id", element: <ChatPage /> },
                      { path: "profile/:id" , element: <OtherProfile/>},
                      { path: "todoes" , element: <Calendar/>},
                      { path: "diary" , element: <Diary/>},

                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
