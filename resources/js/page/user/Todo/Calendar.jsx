import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
    let todayStr = new Date().toISOString().replace(/T.*$/, "");
    const [events, setEvents] = useState([
        {
            id: 2,
            title: "All-day event",
            start: todayStr,
        },
        {
            id: 3,
            title: "honkaj si",
            start: todayStr + "T12:00:00",
            body: "yedol kkt"
        },
    ]);

    const renderEventContent = (eventInfo) =>{
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
                <i>{eventInfo.event.extendedProps.body}</i>
            </>
        );
    }

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

    const handleEventClick = (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove()
        }
      }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            editable={true}
            select={handleDateSelect}
            initialEvents={events}
            eventContent={renderEventContent}
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={handleEventClick}
        />
    );
};

export default Calendar;
