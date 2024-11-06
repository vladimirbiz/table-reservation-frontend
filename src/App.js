import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import MainApp from './MainApp';
import DatePicker from './DatePicker'; // Import DatePicker if it's a separate component
import "./css/App.css";

function App() {
    const [token, setToken] = useState(null);
    const [date, setDate] = useState(null);

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
                <MainApp token={token} date={date} /> // Pass the token to MainApp
            ) : (
                <DatePicker setDate={setDate} /> // Pass setDate to DatePicker
            )}
        </div>
    );
}

export default App;
