import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';

function App() {
  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const changeData = async (id) => {
      setLoading(true); // Start loading animation
      await new Promise(resolve => setTimeout(resolve, 5000));

      try {
          const response = await axios.put(`https://localhost:5001/my/${id}`);
          setData(response.data);
          return response; // Set the response data
      } catch (error) {
          console.error('There was an error fetching the data!', error);
          setError(error); // Set error if any
      } finally {
          setLoading(false); // Stop loading animation
      }
  };
  const getData = useCallback(async (id) => {
    setLoading(true); // Start loading animation

    // Wait for 3 seconds before making the request
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        const response = await axios.get(`https://localhost:5001/my/${id}`);
        setData(response.data);
        return response.data.value; // Set the response data
    } catch (error) {
        console.error('There was an error fetching the data!', error);
        setError(error); // Set error if any
    } finally {
        setLoading(false); // Stop loading animation
    }
}, []);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true); // Start loading animation

        try {
            const response = await axios.get('https://localhost:5001/my');
            setData(response.data); // Set the response data
        } catch (error) {
            console.error('There was an error fetching the data!', error);
            setError(error); // Set error if any
        } finally {
            setLoading(false); // Stop loading animation
        }
    };
        fetchData();
    }, []);

    return (
        <div>
            <div>
            <RedZone changeData={changeData} getData={getData}/>
            <YellowZone changeData={changeData} getData={getData}/>     
            <GreenZone changeData={changeData} getData={getData}/>
            </div>
        </div>
    );
};

export default App;
