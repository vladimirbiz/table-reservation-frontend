import React, { useState, useEffect } from 'react';
import "./css/DatePicker.css";

function DatePicker({ setDate, setDate2, getDayOfWeek }) {
    const today = new Date();
    const [day, setDay] = useState(today.getDate());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Get the number of days in the selected month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    // Create an array of days for the dropdown
    const days = Array.from({ length: getDaysInMonth(currentYear, month) }, (_, i) => i + 1);

    const handleDateChange = (event) => {
        event.preventDefault(); // Prevent form submission
        if (day && month) {
            const formattedDate = `${day}-${month}`; // Format as dd-mm
            console.log("Selected Date: " + formattedDate);
            setDate(day); // Call the setDate function with the day value
            setDate2(month);
        }
    };

    return (
        <div className="div-center">
            <h1>Select a Date</h1>
            
            <div className='getDayOfWeek-div'>{getDayOfWeek(day,month)}</div>
            <form onSubmit={handleDateChange}>
                <select
                    className='date-select'
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Day</option>
                    {days.map((dayNum) => (
                        <option key={dayNum} value={dayNum} disabled={month < currentMonth || (month === currentMonth && dayNum < currentDay)}>
                            {dayNum}
                        </option>
                    ))}
                </select>
                <select
                className='date-select'
                    value={month}
                    onChange={(e) => {
                        const newMonth = parseInt(e.target.value);
                        setMonth(newMonth);
                        // Update days when the month changes
                        if (newMonth < currentMonth) {
                            setDay(''); // Reset day if the month is in the past
                        }
                    }}
                >
                    <option value="" disabled>Select Month</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((monthNum) => (
                        <option key={monthNum} value={monthNum} disabled={monthNum < currentMonth}>
                            {monthNum}
                        </option>
                    ))}
                </select>
                <button className="date-button" type="submit">Submit</button>
            </form>
        </div>
        
    );
}

export default DatePicker;
