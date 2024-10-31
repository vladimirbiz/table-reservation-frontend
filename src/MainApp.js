import React, { useCallback, useState } from 'react';
import axios from 'axios';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';
import Divider from './Divider';
import "./SignIn.css";

function MainApp({ token }) {
    const [loading, setLoading] = useState(false); // Loading state

    const changeData = async (id, value) => {
        setLoading(true); // Start loading
        await new Promise(resolve => setTimeout(resolve, 1050));
        console.log("Value is " + value);
        try {
            const response = await axios.put(`https://tables-api-latest.onrender.com/my/${id}/${value}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            return response; 
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    const getData = useCallback(async (id) => {
        setLoading(true); // Start loading
        await new Promise(resolve => setTimeout(resolve, 1050));
        try {
            const response = await axios.get(`https://tables-api-latest.onrender.com/my/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.value; // Set the response data
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        } finally {
            setLoading(false); // End loading
        }
    }, [token]);

    const handleReset = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch('https://localhost:5001/my/reset', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error('Failed to reset tables');
            }

            const data = await response.json();
            alert(data.Message); // Display success message
        } catch (error) {
            console.error('Error resetting tables:', error);
            alert('Error resetting tables. Please try again.');
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div>
            <div>
                <h1 className='mainh1'>Table Reservations - Intermezzo</h1>
            </div>
            {loading && <div class="loading-bar-container">
    <div class="loading-bar"></div>
</div>} {/* Loading indicator */}
            <div className="seat-block">
                <div>
                    <Divider color={"black"} />
                    <RedZone changeData={changeData} getData={getData} />
                    <Divider color={"black"} />
                </div>
                <div>
                    <YellowZone changeData={changeData} getData={getData} />
                    <Divider color={"black"} />
                </div>
                <div>
                    <GreenZone changeData={changeData} getData={getData} />
                    <Divider color={"black"} />
                </div>
            </div>
        </div>
    );
}

export default MainApp;
