// CalendarLogic.js
export const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayIndex = firstDayOfMonth.getDay();

    let calendar = [];

    // Add leading empty slots for the previous month
    for (let i = 0; i < firstDayIndex; i++) {
        calendar.push({
            date: null,
            currentMonth: false
        });
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
        calendar.push({
            date: new Date(year, month, i),
            currentMonth: true
        });
    }

    // Add trailing empty slots for the next month
    const trailingDays = 42 - calendar.length; // Ensures a full 6x7 grid
    for (let i = 0; i < trailingDays; i++) {
        calendar.push({
            date: null,
            currentMonth: false
        });
    }

    return calendar;
};
