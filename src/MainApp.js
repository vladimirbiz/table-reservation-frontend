import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import "./css/MainApp.css";
import Zone from './Zone';
import NameForm from './NameForm'; // Import NameForm

function MainApp({ token, date, date2, setDate, getDayOfWeek, reservationBy }) {
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState(null);
    const [nameSetter, setNameSetter] = useState(null); // Holds id, value, and name for reservation
    const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
    const [searchResults, setSearchResults] = useState(null); // State to hold search results

    const changeData = async (id, value, name) => {
        setLoading(true);
        console.log(id + "-id,  value-"+value+" , name-"+name);
        await new Promise(resolve => setTimeout(resolve, 1050)); // Simulate loading delay
        try {
            const response = await axios.put(
                `https://tables-api-latest.onrender.com/tables/${date}/${id}/${value}/${name}/${reservationBy}`,
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
            console.log("INITIAL DATA");
            console.log(response.data);
            setInitialData(response.data);
        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        } finally {
            setLoading(false);
        }
    }, [date, token]);

    const fetchInitialData2 = useCallback(async () => {
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
        }
    }, [date, token]);

    useEffect(() => {
        fetchInitialData(); // Fetch once when the component mounts

        const intervalId = setInterval(() => {
            fetchInitialData2(); // Fetch every 5 seconds
        }, 60000);

        // Cleanup interval on component unmount or re-render
        return () => clearInterval(intervalId);
    }, [fetchInitialData]); // Re-run if fetchInitialData function changes

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

    const handleSearch = () => {
        if (!searchQuery) {
            setSearchResults(null);
            return;
        }
        
        const lowerSearchQuery = searchQuery.toLowerCase();
        const results = initialData.filter(guest => 
            (guest.name.toLowerCase().includes(lowerSearchQuery) || guest.id.toString().includes(searchQuery)) && !guest.name.toLowerCase().includes("no-name")
        );
        setSearchResults(results.length > 0 ? results : "No matching reservations found.");
    };

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
                    <div className="seat-block">
                        {loading && (
                            <div>
                                <h1 className='mainh1'>Table Reservations - Intermezzo<br></br><br></br>
                {date}/{date2}   {getDayOfWeek(date,date2)}
                </h1>
                                <div className="loading-bar-container">
                                    <div className="loading-bar"></div>
                                </div>
                            </div>
                        )}

                        <Zone
                            getData={initialData ? getData : null} // Only pass getData if initialData is loaded
                            changeData={changeData} // Trigger NameForm by passing setNameSetter
                            changeData2={setNameSetter}
                            initialData={initialData}
                            handleReset={handleReset}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            handleSearch={handleSearch} 
                            searchResults={searchResults}
                            date={date}
                            date2={date2}
                            getDayOfWeek={getDayOfWeek}
                            setDate={setDate}
                        />
                    </div>
            )}
        </div>
    );
}

export default MainApp;
