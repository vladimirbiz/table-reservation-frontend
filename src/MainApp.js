import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import "./SignIn.css";
import Zone from './Zone';
import NameForm from './NameForm'; // Import NameForm

function MainApp({ token, date }) {
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState(null);
    const [nameSetter, setNameSetter] = useState(null); // To hold the id, value, and name for reservation

    const changeData = async (id, value, name) => {
        setLoading(true);
        console.log(id + "-id,  value-"+value+" , name-"+name);
        await new Promise(resolve => setTimeout(resolve, 1050)); // Add some delay for loading
        try {
            const response = await axios.put(
                `https://tables-api-latest.onrender.com/tables/${date}/${id}/${value}/${name}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error fetching data!', error);
        } finally {
            setLoading(false); // End loading
            fetchInitialData();
        }
    };

    const fetchInitialData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://tables-api-latest.onrender.com/tables/${date}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInitialData(response.data);
        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        } finally {
            setLoading(false);
        }
    }, [date, token]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const getData = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://tables-api-latest.onrender.com/tables/${date}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.value; // Return the value of the seat
        } catch (error) {
            console.error('Error fetching data!', error);
        } finally {
            setLoading(false); // End loading
        }
    }, [date, token]);

    const handleReset = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://tables-api-latest.onrender.com/tables/${date}/reset`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
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

    return (
        <div>
            {nameSetter ? (
                <NameForm 
                    changeData={changeData} 
                    setNameSetter={setNameSetter}
                    nameSetter={nameSetter}
                />
            ) : (
                <div>
                    <h1 className='mainh1'>Table Reservations - Intermezzo</h1>
                    <div className="seat-block">
                        {loading && (
                            <div className="loading-bar-container">
                                <div className="loading-bar"></div>
                            </div>
                        )}

                        {/* Show Zone when nameSetter is not set */}
                        <Zone
                            getData={getData}
                            changeData={setNameSetter} // Set nameSetter here when a seat is selected
                            initialData={initialData}
                            handleReset={handleReset}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainApp;