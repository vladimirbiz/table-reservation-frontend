import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import MainApp from './MainApp';

function App() {
    const [token, setToken] = useState(null);

    const handleSignIn = (token) => {
        setToken(token);
        localStorage.setItem('YourSecretKey1', token); // Save token in localStorage
    };
  
    return (
        <div>
            {!token ? (
                <SignIn onSignIn={handleSignIn} />
            ) : (
                <MainApp token={token}/> // Pass the token to MainApp
            )}
        </div>
    );
}

export default App;
