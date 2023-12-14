import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "./Calendar.css"
import axios from 'axios';

export default function Calendar() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [appoint, setAppoint] = useState({
        appID: '',
        procName: '',
        petName: '',
        petID: '',
        date: ''
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Fetch events from the server when the component mounts
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:8800/events");
                setAppoint(res.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchEvents();
    }, []);

    const isEventOnDate = (date) => {
        return appoint.some((event) => dayjs(event.date).isSame(date, 'day'));
    };

    const handleDateClick = (date) => {
        const clickedEvents = appoint.filter((event) => dayjs(event.date).isSame(date, 'day'));
        setSelectDate(date);
        setSelectedEvent(clickedEvents);
    };

    const handleChange = (e) => {
        setAppoint({ ...appoint, date: dayjs(e.target.value).format('YYYY-MM-DD') });
    };

    const handleDateChange = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8800/appointment/${appoint.appID}`, appoint);
            console.log(`Update event date to: ${appoint.date}`);
        } catch (error) {
            console.error(error);
        }
        // Close the modal after updating the event date
        closeModal();
    };

    return (
        <div className="outer-calendar flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col">
            <div className="w-96 h-96 ">
                <div className="flex justify-between items-center">
                    <h1 className="select-none font-semibold">
                        {months[today.month()]}, {today.year()}
                    </h1>
                    <div className="flex gap-10 items-center ">
                        <GrFormPrevious
                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(today.month(today.month() - 1));
                            }}
                        />
                        <h1
                            className=" cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(currentDate);
                            }}
                        >
                            Today
                        </h1>
                        <GrFormNext
                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(today.month(today.month() + 1));
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-7 ">
                    {days.map((day, index) => {
                        return (
                            <h1
                                key={index}
                                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                            >
                                {day}
                            </h1>
                        );
                    })}
                </div>
                <div className=" grid grid-cols-7 ">
                    {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
                        return (
                            <div
                                key={index}
                                className="date p-2 text-center h-14 grid place-content-center text-sm border-t"
                            >
                                <h1
                                    className={cn(
                                        currentMonth ? '' : 'text-gray-400',
                                        today ? 'bg-red-600 text-white' : '',
                                        selectDate.toDate().toDateString() === date.toDate().toDateString()
                                            ? 'bg-black text-white'
                                            : '',
                                        isEventOnDate(date) ? 'border-blue-500' : '',
                                        'h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none'
                                    )}
                                    onClick={() => {
                                        handleDateClick(date);
                                    }}
                                >
                                    {date.date()}
                                </h1>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="forDate h-96 w-96 sm:px-5">
                <h1 className="font-semibold">
                    {selectedEvent && selectedEvent.length > 0
                        ? `Events on ${selectDate.toDate().toDateString()}`
                        : `Schedule for ${selectDate.toDate().toDateString()}`}
                </h1>
                {selectedEvent && selectedEvent.length > 0 ? (
                    <ul>
                        {selectedEvent.map((event) => (
                            <li key={event.appID} onClick={() => openModal()}>
                                {event.petID && <div>{event.procName}</div>}
                                <div>for {event.petName}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400">No events for the selected date.</p>
                )}
            </div>

            {/* Modal for changing the event date */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => closeModal()}>
                            &times;
                        </span>
                        <h2>Change Event Date</h2>
                        <label>New Date:</label>
                        <input
                            type="date"
                            value={appoint.date.format('YYYY-MM-DD')}
                            onChange={handleChange}
                        />
                        <button onClick={handleDateChange}>Save Changes</button>
                    </div>
                </div>
            )}

        </div>
    );
}