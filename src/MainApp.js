import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';
import Divider from './Divider';
import "./SignIn.css";

function MainApp({ token }) {
    const [loading, setLoading] = useState(false); // Loading state
    const [loading2, setLoading2] = useState(false); // Loading state
    const [loading3, setLoading3] = useState(false); // Loading state
    const [initialData, setInitialData] = useState(null);

    const changeData = async (id, value) => {
        if(id < 87){
            setLoading(true);
        }
        else if(id < 138)
        {
            setLoading2(true);
        }
        else{
            setLoading3(true);
        }
        await new Promise(resolve => setTimeout(resolve, 1050));
        try {
            const response = await axios.put(`https://localhost:5001/tables/${id}/${value}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response; 
        } catch (error) {
            console.error('Error fetching data!', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://localhost:5001/tables', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setInitialData(response.data); // Set initialData directly
            } catch (error) {
                console.error('Failed to fetch initial data:', error);
            } finally {
                setLoading(false); // End loading
            setLoading2(false); // End loading
            setLoading3(false); // End loading
            }
        };

        fetchInitialData();
    }, [token]);
        
    

    const getData = useCallback(async (id) => {
        if(id < 87){
            setLoading(true);
        }
        else if(id < 138)
        {
            setLoading2(true);
        }
        else{
            setLoading3(true);
        }
        await new Promise(resolve => setTimeout(resolve, 1050));
        try {
            const response = await axios.get(`https://localhost:5001/tables/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.value;
        } catch (error) {
            console.error('Error fetching data!', error);
        } finally {
            setLoading(false); // End loading
            setLoading2(false); // End loading
            setLoading3(false); // End loading
        }
    }, [token]);

    const handleReset = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://localhost:5001/tables/reset', {
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
    <h1 className='mainh1'>Table Reservations - Intermezzo</h1>
    
    <div className="seat-block">
        {/* Red Zone Section */}
        <div>
        {loading ? (
    <div className="loading-bar-container">
        <div className="loading-bar"></div>
    </div>
) : (
    <>
        <Divider color={"black"} />
        <RedZone changeData={changeData} getData={getData} initialData={initialData} />
        <Divider color={"black"} />
    </>
)}

        </div>

        {/* Yellow Zone Section */}
        <div>
        {loading2 ? (
    <div className="loading-bar-container">
        <div className="loading-bar"></div>
    </div>
) : (
    <>
        <YellowZone changeData={changeData} getData={getData} initialData={initialData} />
    </>
)}

        </div>

        {/* Green Zone Section */}
        <div>
        {loading3 ? (
    <div className="loading-bar-container">
        <div className="loading-bar"></div>
    </div>
) : (
    <>
        <Divider color={"black"} />
        <GreenZone changeData={changeData} getData={getData} initialData={initialData} />
        <Divider color={"black"} />
    </>
)}

        </div>
    </div>
</div>

    );
}

export default MainApp;
