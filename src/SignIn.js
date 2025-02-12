import React, { useState } from 'react';
import "./css/SignIn.css";

const SignIn = ({ onSignIn, setReservationBy}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://tables-api-latest.onrender.com/api/login', {
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
            setReservationBy(email);
            onSignIn(data.accessToken);
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <div >
        <form className="div-center styledForm" onSubmit={handleSubmit}>
        <h1 className='signInh1'>Sign In</h1>
            <div>
                <label className='label-signIn'>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className='label-signIn'>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className= "errorP">{error}</p>}
            <div><button className='formButton' type="submit">Sign In</button></div>
        </form>
        </div>
    );
};

export default SignIn;
