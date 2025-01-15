import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import MainApp from './MainApp';
import DatePicker from './DatePicker'; // Import DatePicker if it's a separate component
import "./css/App.css";

function App() {
    const [token, setToken] = useState(null);
    const [date, setDate] = useState(null);
    const [date2, setDate2] = useState(null);

    const handleSignIn = (token) => {
        setToken(token);
        localStorage.setItem('Token', token); // Save token in localStorage
        console.log({localStorage});
    };

    return (
        <div>
            {!token ? (
                <SignIn onSignIn={handleSignIn} />
            ) : date ? (
                <MainApp token={token} date={date} date2={date2} /> // Pass the token to MainApp
            ) : (
                <DatePicker setDate={setDate} setDate2={setDate2}/> // Pass setDate to DatePicker
            )}
        </div>
    );
}

export default App;
