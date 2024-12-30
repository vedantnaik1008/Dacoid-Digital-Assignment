/* eslint-disable react/prop-types */
import { useState } from 'react';
import { generateCalendar } from '../CalendarLogic';
import EditEvents from './EditEvents';

const Calendar = ({
    currentYear,
    currentMonth,
    events,
    setEvents,
    today
}) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const calendar = generateCalendar(currentYear, currentMonth);

    const handleAddEvent = () => {
        const eventName = prompt('Enter event name:');
        const startTime = prompt('Enter start time (HH:MM):');
        const endTime = prompt('Enter end time (HH:MM):');
        const description = prompt('Enter description (optional):');

        if (eventName && startTime && endTime) {
            const dateKey = selectedDate.toISOString().split('T')[0];

            // Check for overlapping events
            const overlappingEvent = events[dateKey]?.some((event) => {
                return (
                    (startTime >= event.startTime &&
                        startTime < event.endTime) ||
                    (endTime > event.startTime && endTime <= event.endTime)
                );
            });

            if (overlappingEvent) {
                alert('There is already an event scheduled at this time.');
                return;
            }

            const newEvent = {
                name: eventName,
                startTime,
                endTime,
                description
            };

            setEvents((prevEvents) => {
                const updatedEvents = {
                    ...prevEvents,
                    [dateKey]: [...(prevEvents[dateKey] || []), newEvent]
                };
                return updatedEvents;
            });
        }
    };

    const handleDeleteEvent = (dateKey, eventIndex) => {
        setEvents((prevEvents) => {
            const updatedEvents = { ...prevEvents };
            updatedEvents[dateKey] = updatedEvents[dateKey].filter(
                (_, index) => index !== eventIndex
            );
            if (updatedEvents[dateKey].length === 0) {
                delete updatedEvents[dateKey];
            }
            return updatedEvents;
        });
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <>
            <div className='overflow-x-scroll overflow-y-hidden scrollbar w-full'>
                <div className='weekdays'>
                    {weekDays.map((day, index) => (
                        <div key={index} className='weekday'>
                            {day}
                        </div>
                    ))}
                </div>
                <div className='calendar-grid'>
                    {calendar.map((day, index) => {
                        const dateKey = day.date
                            ? day.date.toISOString().split('T')[0]
                            : null;
                        const hasEvent =
                            dateKey &&
                            events[dateKey] &&
                            events[dateKey].length > 0;
                        return (
                            <div
                                key={index}
                                className={`${
                                    selectedDate &&
                                    selectedDate.toDateString() ===
                                        day.date?.toDateString()
                                        ? '!bg-green-400 !text-white'
                                        : ''
                                } relative day ${
                                    day.currentMonth ? 'current' : ''
                                } ${
                                    day.date &&
                                    day.date.toDateString() ===
                                        today.toDateString()
                                        ? 'today'
                                        : ''
                                } `}
                                onClick={() => handleDayClick(day.date)}>
                                {day.date ? day.date.getDate() : ''}
                                <span
                                    className={
                                        hasEvent
                                            ? 'before:bg-blue-500 before:rounded-full before:h-3 before:w-3 before:absolute before:top-0 before:right-0 block'
                                            : 'hidden'
                                    }></span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                {selectedDate && (
                    <div className='event-modal'>
                        <h3>Events for {selectedDate.toDateString()}</h3>
                        <ul className='flex flex-wrap h-full justify-center items-center gap-4 overflow-y-scroll overflow-x-hidden mt-4 scrollbar'>
                            {(
                                events[
                                    selectedDate.toISOString().split('T')[0]
                                ] || []
                            ).map((event, index) => (
                                <li
                                    key={index}
                                    className='border-black rounded-lg border px-3 py-3'>
                                    <strong>{event.name}</strong> (
                                    {event.startTime} - {event.endTime})<br />
                                    <p className=''>{event.description}</p>
                                    <div className='flex gap-[10px] justify-center items-center'>
                                        <button
                                            onClick={() =>
                                                handleDeleteEvent(
                                                    selectedDate
                                                        .toISOString()
                                                        .split('T')[0],
                                                    index
                                                )
                                            }>
                                            Delete
                                        </button>
                                        <EditEvents
                                            events={events}
                                            setEvents={setEvents}
                                            selectedDate={
                                                selectedDate
                                                    .toISOString()
                                                    .split('T')[0]
                                            }
                                            index={index}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className='events-buttons mt-4'>
                            <button onClick={handleAddEvent}>Add Event</button>
                            <button onClick={() => setSelectedDate(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Calendar;
