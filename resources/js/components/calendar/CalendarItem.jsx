import { forwardRef, useState } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import http from "../../service/Http";

const CalendarItem = forwardRef((props, ref) => {
    const { item, id, number } = props;
    const [removedId, setRemovedId] = useState([]);
    const [showForm, setShowForm] = useState(false);

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
        props.setCurrent()
    };

    const onClickDelete = async (id, date) => {
        await http
            .delete("api/todoes/" + id)
            .then((data) => {
                console.log(data);
                setRemovedId([...removedId, id])
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
                <div>
                <p>{item.date}</p>
                    <button className="btn-cstm-orange"></button>
                </div>
                {item.todo &&
                    sortedTodo.map((todo) => {
                        if(removedId.includes(todo.id)){
                            return
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
