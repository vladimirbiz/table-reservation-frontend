import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';
import Divider from './Divider';
import "./SignIn.css";

function MainApp({ token }) {
    const [loading, setLoading] = useState(false); // Loading state
    const [initialLoading, setInitialLoading] = useState(true); // Loading for initial data fetch

    const changeData = async (id, value) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2050));
            console.log("Value is " + value);
            const response = await axios.put(`https://tables-api-latest.onrender.com/my/${id}/${value}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            return response; 
        } catch (error) {
            console.error('Error fetching data!', error);
        } finally {
            setLoading(false);
        }
    };

    const getData = useCallback(async (id) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2050));
            const response = await axios.get(`https://tables-api-latest.onrender.com/my/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.value;
        } catch (error) {
            console.error('Error fetching data!', error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const handleReset = async () => {
        setLoading(true);
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
            alert(data.Message);
        } catch (error) {
            console.error('Error resetting tables:', error);
            alert('Error resetting tables. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            setInitialLoading(true); // Start loading for initial fetch
            try {
                // Call getData for the initial load
                await getData('*'); // Replace 'initialId' with the actual ID you want to fetch
            } catch (error) {
                console.error('Error fetching initial data!', error);
            } finally {
                setInitialLoading(false); // End initial loading
            }
        };

        fetchInitialData();
    }, [getData]);

    return (
        <div>
            <div>
                <h1 className='mainh1'>Table Reservations - Intermezzo</h1>
            </div>
            {(loading || initialLoading) ? (
                <div className="loading-bar-container">
                    <div className="loading-bar"></div>
                </div>
            ) : (
                <div className="seat-block">
                    <Divider color={"black"} />
                    <RedZone changeData={changeData} getData={getData} />
                    <Divider color={"black"} />
                    <YellowZone changeData={changeData} getData={getData} />
                    <Divider color={"black"} />
                    <GreenZone changeData={changeData} getData={getData} />
                    <Divider color={"black"} />
                </div>
            )}
        </div>
    );
}

export default MainApp;
