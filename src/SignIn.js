import React, { useState } from 'react';
import "./SignIn.css";

const SignIn = ({ onSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:5001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email, Password: password }), // Adjust as needed
            });
    
            if (!response.ok) {
                throw new Error('Login failed'); // Properly handle login failure
            }
    
            const data = await response.json();
            console.log(data);
            onSignIn(data.accessToken);
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <div className='form-container'>
        <h1 className='signInh1'>Sign In</h1>
        <form className="styledForm" onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div><button className='formButton' type="submit">Sign In</button></div>
        </form>
        </div>
    );
};

export default SignIn;
