import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import MainApp from './MainApp';
import DatePicker from './DatePicker'; // Import DatePicker if it's a separate component
import "./css/App.css";

function App() {
    const [token, setToken] = useState(null);
    const [date, setDate] = useState(null);
    const [date2, setDate2] = useState(null);
    const [reservationBy, setReservationBy] = useState();

    const handleSignIn = (token) => {
        setToken(token);
        localStorage.setItem('Token', token); // Save token in localStorage
        console.log({localStorage});
    };

    function getDayOfWeek(day, month) {
        const daysOfWeek = ["Nedela", "Ponedelnik", "Vtornik", "Sreda", "Cetvrtok", "Petok", "Sabota"];
        const currentYear = new Date().getFullYear(); // Get the current year
        const date = new Date(currentYear, month - 1, day); // Month is 0-indexed, so subtract 1
        const dayIndex = date.getDay();
        return daysOfWeek[dayIndex];
      }

    return (
        <div>
            {!token ? (
                <SignIn onSignIn={handleSignIn} setReservationBy={setReservationBy} />
            ) : date ? (
                <MainApp token={token} date={date} date2={date2} setDate={setDate} getDayOfWeek={getDayOfWeek} reservationBy={reservationBy}/> // Pass the token to MainApp
            ) : (
                <DatePicker setDate={setDate} setDate2={setDate2} getDayOfWeek={getDayOfWeek}/> // Pass setDate to DatePicker
            )}
        </div>
    );
}

export default App;
