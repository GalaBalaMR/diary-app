import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../../store/user-slice";
import { getToDoes } from "../../../store/user-action";
import CalendarItem from "../../../components/calendar/CalendarItem";
import Modal from "../../../components/ui/Modal";
import CalendarModal from "../../../components/calendar/CalendarModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Calendar = () => {
    const dispatch = useDispatch();
    const todoes = useSelector((state) => state.user.todoes);
    const isLogged = useSelector((state) => state.user.isLogged);
    const todayRef = useRef();
    const [current, setCurrent] = useState(todayRef);
    const [currentNumber, setCurrentNumber] = useState(7);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [item, setItem] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setItem(null);
    };

    const onClickSetItem = (item) => {
        setItem(item);
        setCurrentNumber(item.id);
    };

    const length = todoes.length;

    const scrollToBottom = (how) => {
        current.current?.scrollIntoView({
            behavior: how,
            block: "center",
        });
    };

    useEffect(() => {
        scrollToBottom("instant");
    }, []);

    useEffect(() => {
        scrollToBottom("smooth");
    }, [currentNumber]);

    // currentNumber is send as props in calendar item, which render ref for item based on current number
    const onClickPrevious = () => {
        if (currentNumber == 0) {
            return;
        }
        setCurrentNumber(currentNumber - 1);
    };

    const onClickAfter = () => {
        if (currentNumber == length - 1) {
            return;
        }
        setCurrentNumber(currentNumber + 1);
    };

    const setCurrentOnAdd = (numb) =>{
        setCurrentNumber(numb)
        console.log()
    }

    let calendar = null;

    if (todoes.length > 0) {
        calendar = todoes.map((item, key) => {
            return (
                <CalendarItem
                    item={item}
                    id={key}
                    key={key}
                    ref={todayRef}
                    number={currentNumber}
                    setItem={onClickSetItem}
                    openModal={openModal}
                    setCurrentOnAdd={setCurrentOnAdd}
                />
            );
        });
        scrollToBottom("instant");
    }

    const onClickScrollToday = () => {
        setCurrentNumber(7);
        scrollToBottom("smooth");
    };

    return (
        <div className="calendar">
            <div className="previous" onClick={onClickPrevious}>
                <ArrowDropUpIcon className="d-block m-auto" fontSize="large" />
            </div>
            <div className="days-container">
                <div className="bg-up"></div>
                {calendar}
                <div className="scroll-today" onClick={onClickScrollToday}>
                    Today
                </div>
                <div className="bg-down"></div>
            </div>
            <div className="after" onClick={onClickAfter}>
                <ArrowDropDownIcon
                    className="d-block m-auto "
                    fontSize="large"
                />
            </div>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <CalendarModal item={item} />
                </Modal>
            )}
        </div>
    );
};

export default Calendar;
