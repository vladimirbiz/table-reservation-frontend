import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const changeData = async (id) => {
      setLoading(true); // Start loading animation

      // Wait for 3 seconds before making the request
      await new Promise(resolve => setTimeout(resolve, 3000));

      try {
          const response = await axios.put(`https://localhost:5001/my/${id}`);
          setData(response.data); // Set the response data
      } catch (error) {
          console.error('There was an error fetching the data!', error);
          setError(error); // Set error if any
      } finally {
          setLoading(false); // Stop loading animation
      }
  };

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
            {loading && <div>Loading...</div>} {/* Show loading animation */}
            {error && <div>Error: {error.message}</div>} {/* Show error message */}
            {data && <div>{JSON.stringify(data)}</div>} {/* Render data */}
            <div>
              <button onClick={() => changeData(1)}>Change 1</button>
              <button onClick={() => changeData(2)}>Change 2</button>
              <button onClick={() => changeData(3)}>Change 3</button>
              <button onClick={() => changeData(4)}>Change 4</button>
              <button onClick={() => changeData(5)}>Change 5</button>
            </div>
        </div>
    );
};

export default App;
