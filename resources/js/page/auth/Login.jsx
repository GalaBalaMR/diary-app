import { useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useValidInput from "../../hooks/use-Valid-Input";
import { userAction } from "../../store/user-slice";
import http from "../../service/Http";

const Login = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        inputHandler: emailInputHandler,
        onBlurHandler: onBlurEmailHandler,
        reset: resetEmail,
    } = useValidInput((value) => value.includes("@") || value.includes("."));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        inputHandler: passwordInputHandler,
        onBlurHandler: onBlurPasswordHandler,
        reset: resetPassword,
    } = useValidInput((value) => value.length > 6);

    let isValidForm = false;

    if (enteredPasswordIsValid === true && enteredEmailIsValid === true) {
        isValidForm = true;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const csrf = await http.get("/sanctum/csrf-cookie");

        const formData = new FormData();

        formData.append("email", enteredEmail);
        formData.append("password", enteredPassword);

        const login = await http
            .post("/api/login", formData)
            .then((data) => {
                // console.log(data.data.data.user)
                dispatch(userAction.addUser(data.data.data.user));
                dispatch(userAction.isLogged(true));
                navigateTo("/");
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    };

    const emailClass = emailInputHasError ? "invalid" : "";
    const passwordClass = passwordInputHasError ? "invalid" : "";
    return (
        <div id="login">
            <form onSubmit={onSubmitHandler}>
                <div className={emailClass}>
                    <label className="form-label" htmlFor="email">
                        Your Email
                    </label>
                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        onChange={emailInputHandler}
                        onBlur={onBlurEmailHandler}
                        value={enteredEmail}
                    />
                    {emailInputHasError && (
                        <p className="error">Email has to include @.</p>
                    )}
                </div>

                <div className={passwordClass}>
                    <label className="form-label" htmlFor="password">
                        Your Password
                    </label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        onChange={passwordInputHandler}
                        onBlur={onBlurPasswordHandler}
                        value={enteredPassword}
                    />
                    {passwordInputHasError && (
                        <p className="error">
                            Password must be longer than 6 characters.
                        </p>
                    )}
                </div>
                <button disabled={!isValidForm} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
