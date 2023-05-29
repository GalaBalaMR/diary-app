import { forwardRef, useRef, useState } from "react";
import Moment from "moment";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import http from "../../service/Http";
import moment from "moment";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/user-slice";
import { uiActions } from "../../store/ui-slice";

const CalendarItem = forwardRef((props, ref) => {
    const { item, id, number } = props;
    const [removedId, setRemovedId] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [notifTitle, setNotifTitle] = useState(null);
    const [notifBody, setNotifBody] = useState(null);
    const [notifTime, setNotifTime] = useState(null);
    const titleRef = useRef();
    const bodyRef = useRef();
    const timeRef = useRef();
    const dispatch = useDispatch()

    const addTitle = (event) => {
        if (event.target.value.length <= 3) {
            setNotifTitle("Title has to be longer than 3 letter...");
            return;
        }
        setNotifTitle(null);
        setTitle(event.target.value);
    };
    const addBody = (event) => {
        if (event.target.value.length <= 5) {
            setNotifBody("Body has to be longer than 5 letter...")
            return;
        }
        setNotifBody(null);
        setBody(event.target.value);
    };

    const addTime = (event) => {
        setTime(event.target.value);
    };

    const formatDate = Moment(item.date).format("DD-MMMM-YYYY");

    const whichDay = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    };

    const onClickSetModal = (todo) => {
        props.setItem({ todo, id });
        props.openModal();
    };

    const onClickDelete = async (id, date) => {
        await http
            .delete("api/todoes/" + id)
            .then((data) => {
                setRemovedId([...removedId, id]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // currentNumber from calendar, which is use for compare,
    // if is equal to id of calendar item, and when is,
    // ref is set for this element
    let todayRef = null;
    let classActive = "";
    let classToday = "";

    if (id == number) {
        classActive = "active";
        todayRef = ref;
    }
    // for css today
    if (item.now === "true") {
        classToday = " today ";
    }
    let sortedTodo = "";
    if (item.todo) {
        sortedTodo = [...item.todo].sort((a, b) => {
            // Assuming the 'time' property is in the format 'HH:mm'
            const timeA = new Date(`2000-01-01T${a.time}`);
            const timeB = new Date(`2000-01-01T${b.time}`);

            // Compare the time values
            if (timeA < timeB) {
                return -1;
            }
            if (timeA > timeB) {
                return 1;
            }
            return 0;
        });
    }

    const onClickToogleForm = () => {
        setShowForm(!showForm);
    };

    const validForm = time == null || notifTitle !== null || notifBody !== null;

    const onSubmitAddToDo = async(e) => {
        e.preventDefault();
        if (time == null) {
            setNotifTime("You have to set time...");
            return;
        } else{
            setNotifTime(true);
        }

        const data = {
            title: title,
            body: body,
            time: time,
            date: item.date,
        };

        await http.post("api/todoes", data).then((response)=> {
            console.log(response.data.todo)
            dispatch(userAction.addTodoes({todo: response.data.todo}))
            dispatch(uiActions.notification({
                status: "success",
                title: "Successfully added..",
                message: "Your todo: "+ title +" was added...",
            }))
            props.setCurrentOnAdd(id)
            titleRef.current.value = ""
            bodyRef.current.value = ""
            timeRef.current.value = ""
            setShowForm(false)
        }).catch((error)=>{
            console.log(error)
            dispatch(uiActions.notification({
                status: "danger",
                title: "Something went wrong..",
                message: "Your todo: "+ title +" was not correct...",
            }))
        })

    };

    return (
        <div
            className={" calendar-item col-12 row " + classActive + classToday}
            ref={todayRef}
            id={"calendar-" + id}
        >
            <div className="day-title col-2">
                <p>
                    {Object.values(whichDay).map((day, key) => {
                        return key === item.day ? day : null;
                    })}
                </p>
            </div>
            <div className="todo col-10">
                <div className="d-flex justify-content-between align-items-center my-2">
                    <p className="mb-0">{formatDate}</p>
                    <button
                        className="btn-cstm-orange"
                        onClick={onClickToogleForm}
                    >
                        Add ToDo
                    </button>
                </div>
                {showForm && (
                    <form onSubmit={onSubmitAddToDo}>
                        <label htmlFor="" className="form-label">
                            Title
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            onChange={addTitle}
                            ref={titleRef}
                        />
                        <p className="text-danger">{notifTitle}</p>
                        <label htmlFor="" className="form-label">
                            Body
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="body"
                            onChange={addBody}
                            ref={bodyRef}
                        />
                        <p className="text-danger">{notifBody}</p>

                        <label htmlFor="" className="form-label">
                            Time
                        </label>
                        <input
                            className="form-control"
                            type="time"
                            name="time"
                            step="60"
                            onChange={addTime}
                            ref={timeRef}
                        />
                        <p className="text-danger">{notifTime}</p>
                        <input
                            type="hidden"
                            name="date"
                            value={item.date}
                        />
                        <button
                            type="submit"
                            className="btn-cstm-orange d-block m-auto my-3"
                            disabled={validForm}
                        >
                            Add ToDo
                        </button>
                    </form>
                )}
                {item.todo &&
                    sortedTodo.map((todo) => {
                        if (removedId.includes(todo.id)) {
                            return;
                        }
                        return (
                            <div
                                className="todo-item d-flex align-items-center my-2 justify-content-between"
                                key={todo.id}
                                onClick={function () {
                                    onClickSetModal(todo);
                                }}
                            >
                                <div className="d-flex align-items-center">
                                    <p className="time">
                                        {todo.time.slice(0, -3)} -{" "}
                                    </p>
                                    <p className="title ms-1">{todo.title}</p>
                                </div>
                                <span className="">
                                    <DeleteOutlineIcon
                                        onClick={function (e) {
                                            e.stopPropagation();
                                            onClickDelete(todo.id, todo.date);
                                        }}
                                        className=""
                                        fontSize="medium"
                                    />
                                </span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
});

export default CalendarItem;
