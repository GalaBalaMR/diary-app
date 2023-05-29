import React, { useState } from "react";
import http from "../../service/Http";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/user-slice";

const CalendarModal = (props) => {
    const { item } = props;
    const [title, setTitle] = useState(item.todo.title);
    const [body, setBody] = useState(item.todo.body);
    const [time, setTime] = useState(item.todo.time);
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };
    const changeBody = (event) => {
        setBody(event.target.value);
    };
    const changeTime = (event) => {
        setTime(event.target.value);
    };

    const onSubmitUpdt = async (event) => {
        event.preventDefault();

        const data = {
            title: title,
            body: body,
            time: time,
            date: item.todo.date,
            id: item.todo.id,
        };

        await http
            .put("api/todoes/" + item.todo.id, data)
            .then((response) => {
                console.log(response);
                dispatch(userAction.updateTodoes({ todo: data, id: item.id }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onClickToogleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <p>Title: {item.todo.title}</p>
            <p>
                When: {item.todo.time.slice(0, -3)}, {item.todo.date}
            </p>
            <p>What: {item.todo.body}</p>

            <button
                className="btn-cstm-orange d-block m-auto"
                onClick={onClickToogleForm}
            >
                {showForm == true ? "Hide form" : "Update"}
            </button>

            {showForm && (
                <form onSubmit={onSubmitUpdt}>
                    <label htmlFor="" className="form-label">
                        Title
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={title}
                        onChange={changeTitle}
                    />
                    <label htmlFor="" className="form-label">
                        Body
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        name="body"
                        value={body}
                        onChange={changeBody}
                    />
                    <label htmlFor="" className="form-label">
                        Time
                    </label>
                    <input
                        className="form-control"
                        type="time"
                        name="time"
                        value={time}
                        step="60"
                        onChange={changeTime}
                    />
                    <button
                        type="submit"
                        className="btn-cstm-orange d-block m-auto mt-3"
                    >
                        Update
                    </button>
                </form>
            )}
        </div>
    );
};

export default CalendarModal;
