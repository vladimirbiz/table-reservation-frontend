import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import "./SignIn.css";
import Zone from './Zone';
import NameForm from './NameForm'; // Import NameForm

function MainApp({ token, date }) {
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState(null);
    const [nameSetter, setNameSetter] = useState(null); // Holds id, value, and name for reservation

    const changeData = async (id, value, name) => {
        setLoading(true);
        console.log(id + "-id,  value-"+value+" , name-"+name);
        await new Promise(resolve => setTimeout(resolve, 1050)); // Simulate loading delay
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
            setLoading(false);
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

    const getData = useCallback(async (id, data) => {
        setLoading(true);
        let objvalue = "";
        let objid = null;
        let objname = undefined;
        for (let i in data) {
            if (data[i].id === id) {
                objvalue = data[i].value;
                objid = data[i].id;
                objname = data[i].name;
                break;
            }
        }
        setLoading(false); // End loading
        return { id: objid, value: objvalue, name: objname };
    }, [initialData]);

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

                        <Zone
                            getData={initialData ? getData : null} // Only pass getData if initialData is loaded
                            changeData={setNameSetter} // Trigger NameForm by passing setNameSetter
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
