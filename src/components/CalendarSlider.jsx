

// eslint-disable-next-line react/prop-types
const CalendarSlider = ({currentYear, currentMonth, setCurrentYear, setCurrentMonth }) => {
    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentYear(currentYear - 1);
            setCurrentMonth(11);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentYear(currentYear + 1);
            setCurrentMonth(0);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };
    return (
        <div className='controls'>
            <button onClick={handlePreviousMonth}>Previous</button>
            <h2>
                {`${new Date(currentYear, currentMonth).toLocaleString(
                    'default',
                    {
                        month: 'long'
                    }
                )} ${currentYear}`}
            </h2>
            <button onClick={handleNextMonth}>Next</button>
        </div>
    );
};

export default CalendarSlider
