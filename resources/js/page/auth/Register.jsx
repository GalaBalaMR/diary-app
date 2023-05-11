import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useValidInput from "../../hooks/use-Valid-Input";
import http from "../../service/Http";
import { uiActions } from "../../store/ui-slice";
import { getUserData } from "../../store/user-action";

const Register = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (image) {
            const previewObject = URL.createObjectURL(image);

            setPreview(previewObject);
            return;
        }

        setPreview(null);
    }, [image]);

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        inputHandler: nameInputHandler,
        onBlurHandler: onBlurNameHandler,
        reset: resetName,
    } = useValidInput((value) => value.length > 6);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        inputHandler: emailInputHandler,
        onBlurHandler: onBlurEmailHandler,
        reset: resetEmail,
    } = useValidInput((value) => value.includes("@") || value.includes("."));

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        hasError: descriptionInputHasError,
        inputHandler: descriptionInputHandler,
        onBlurHandler: onBlurDescriptionHandler,
        reset: resetDescription,
    } = useValidInput((value) => value.length > 20);

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        inputHandler: passwordInputHandler,
        onBlurHandler: onBlurPasswordHandler,
        reset: resetPassword,
    } = useValidInput((value) => value.length > 6);

    const {
        value: enteredPasswordConfirm,
        isValid: enteredPasswordIsValidConfirm,
        hasError: passwordInputHasErrorConfirm,
        inputHandler: passwordInputHandlerConfirm,
        onBlurHandler: onBlurPasswordHandlerConfirm,
        reset: resetPasswordConfirm,
    } = useValidInput((value) => value.length > 6);

    //for image
    const onChangeImg = (event) => {
        setImage(event.target.files[0]);
    };

    let isValidForm = false;

    if (
        enteredPasswordIsValid === true &&
        enteredEmailIsValid === true &&
        enteredNameIsValid === true &&
        enteredDescriptionIsValid === true
    ) {
        isValidForm = true;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const csrf = await http.get("/sanctum/csrf-cookie");

        const formData = new FormData();

        formData.append("name", enteredName);
        formData.append("description", enteredDescription);
        formData.append("email", enteredEmail);
        formData.append("password", enteredPassword);
        formData.append("password_confirmation", enteredPasswordConfirm);
        formData.append("img", image);

        const register = await http
            .post("/api/register", formData)
            .then((res) => {
                console.log(res.data);
                dispatch(
                    uiActions.notification({
                        status: "success",
                        title: "Successfully registered..",
                        message: "We are lucky to see you...",
                    })
                );
                dispatch(getUserData());
                navigateTo("/user");
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    dispatch(uiActions.notification({
                        status: "error",
                        title: error.response.status,
                        message: error.response.data.message,
                    }))
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

    const classes = " d-flex flex-column align-items-center";

    const nameClass = emailInputHasError ? "invalid"+ classes : "" + classes;

    const descriptionClass = emailInputHasError ? "invalid"+ classes : ""+ classes;

    const emailClass = emailInputHasError ? "invalid"+ classes : ""+ classes;

    const passwordClass = passwordInputHasError ? "invalid"+ classes : ""+ classes;
    return (
        <div id="registration">
            <form className="d-flex align-items-center flex-column py-3" onSubmit={onSubmitHandler} encType="multipart/form-data">
                <div className={nameClass+ " col-12 col-sm-10"}>
                    <label className="form-label" htmlFor="name">
                        Your Name
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        onChange={nameInputHandler}
                        onBlur={onBlurNameHandler}
                        value={enteredName}
                    />
                    {nameInputHasError && (
                        <p className="error">
                            Name must be longer than 6 characters.
                        </p>
                    )}
                </div>

                <div className={descriptionClass+ " col-12 col-sm-10"}>
                    <label className="form-label" htmlFor="description">
                        Your Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        onChange={descriptionInputHandler}
                        onBlur={onBlurDescriptionHandler}
                        value={enteredDescription}
                    />
                    {descriptionInputHasError && (
                        <p className="error">
                            Description must be longer than 20 characters.
                        </p>
                    )}
                </div>
                <div className={emailClass+ " col-12 col-sm-10"}>
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

                <div className={passwordClass+ " col-12 col-sm-10"}>
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

                <div className={passwordClass+ " col-12 col-sm-10"}>
                    <label
                        className="form-label"
                        htmlFor="password_confirmation"
                    >
                        Confirm Password
                    </label>
                    <input
                        className="form-control"
                        type="password"
                        id="password_confirmation"
                        onChange={passwordInputHandlerConfirm}
                        onBlur={onBlurPasswordHandlerConfirm}
                        value={enteredPasswordConfirm}
                    />
                    {passwordInputHasError && (
                        <p className="error">
                            Password confirmation must be the same value as
                            Password.
                        </p>
                    )}
                </div>

                {preview && (
                    <img src={preview} className="preview-img img-thumbnail my-3" alt="..." ></img>
                )}
                    {/* <img src='storage/user/profile/adminadmin555/adminadmin555-thumbnail.jpeg' className="preview-img img-thumbnail" alt="..." ></img> */}



                <div className="image col-12 col-sm-10 my-3">
                    <label className="mb-2 d-block text-center" htmlFor="img">Upload image</label>
                    <input
                        className="d-block col-12"
                        type="file"
                        name="img"
                        id="img"
                        onChange={onChangeImg}
                    />
                </div>

                <button className="btn-cstm-orange col-6 col-md-3" disabled={!isValidForm} type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
