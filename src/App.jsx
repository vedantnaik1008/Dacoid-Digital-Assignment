import { useState, useEffect } from 'react';
import './App.css';
import CalendarSlider from './components/CalendarSlider';
import SearchEvents from './components/SearchEvents';
import Calendar from './components/Calendar';

const App = () => {
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [events, setEvents] = useState({}); // Events are stored as { 'YYYY-MM-DD': [{ name, startTime, endTime, description }] }

    // Loads events from localStorage when the component mounts
    useEffect(() => {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            try {
                const parsedEvents = JSON.parse(storedEvents);
                setEvents(parsedEvents); // Parses the events if found
            } catch (error) {
                console.error('Error parsing events from localStorage:', error);
            }
        }
    }, []);

    // Updates localStorage whenever events change
    useEffect(() => {
        if (Object.keys(events).length > 0) {
            localStorage.setItem('events', JSON.stringify(events));
        }
    }, [events]);

    return (
        <div className='app'>
            <header>
                <h1 className='mb-4'>Event Calendar</h1>
                <CalendarSlider
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    setCurrentYear={setCurrentYear}
                    setCurrentMonth={setCurrentMonth}
                />
                <SearchEvents events={events} />
            </header>
            <Calendar currentMonth={currentMonth} currentYear={currentYear} events={events} setEvents={setEvents} today={today}/>
        </div>
    );
};

export default App;
