import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import styled from "@emotion/styled";

import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../../store/user-slice";
import { getToDoes } from "../../../store/user-action";
import "./fullcalendar.css";
import * as bootstrap from "bootstrap";

const Calendar = () => {
    const dispatch = useDispatch();
    const todoes = useSelector((state) => state.user.todoes);
    const isLogged = useSelector((state) => state.user.isLogged);
    const [events, setEvents] = useState(todoes);
    const [popup, setPopup] = useState(null);

    useEffect(() => {
        dispatch(getToDoes());
        setEvents(todoes);
    }, []);

    const StyleWrapper = styled.div`
        fc-popover {
            left: 1;
            background-color: red($color: #000000);
        }
    `;

    const renderEventContent = (eventInfo) => {
        return (
            <>
                {/* <i>{eventInfo.event.extendedProps.created_at */}
                {/* }</i> */}
                <i>{eventInfo.event.title}</i>
                <i>{eventInfo.event.extendedProps.body}</i>
            </>
        );
    };
    console.log(todoes);

    const handleDateSelect = (selectInfo) => {
        let title = prompt("Please enter a new title for your event");
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: 2,
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            });
        }
    };

    let eventPopup = null;
    const handleEventClick = (clickInfo) => {
        // if (
        //     confirm(
        //         `Are you sure you want to delete the event '${clickInfo.event.title}'`
        //     )
        // ) {
        //     clickInfo.event.remove();
        // }

        setPopup(clickInfo);
        console.log(clickInfo.event);
    };

    const handleDidMount = (info) => {
        return setPopup(info.event);
    };

    const onClickRemoveEvent = () => {
        popup.event.remove();
        console.log(popup);
    };

    return (
        <div className="calendar">
            <StyleWrapper>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    editable={true}
                    select={handleDateSelect}
                    initialEvents={events}
                    eventContent={renderEventContent}
                    selectMirror={true}
                    // dayMaxEvents={true}
                    eventClick={handleEventClick}
                    eventDidMount={(info)=>{
                        return new bootstrap.Popover(info.el, {
                            title: info.event.title,
                            placement: "auto",
                            trigger: "hover focus",
                            customClass: "popoverStyle",
                            content: "<p>Hellou this is popover</p>",
                            html: true
                        })
                    }}
                />
            </StyleWrapper>

            {popup && (
                <p>
                    {popup.event._def.title} body:{" "}
                    {popup.event._def.extendedProps.body}
                    <button onClick={onClickRemoveEvent}>vymazat</button>
                </p>
            )}
        </div>
    );
};

export default Calendar;
