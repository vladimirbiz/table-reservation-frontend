import React, { useState, useEffect } from 'react';
import "./Zone.css";

function YellowZone({ changeData, getData }) {
    const [seatStates, setSeatStates] = useState(Array(138).fill(null)); // Array to hold seat data

    useEffect(() => {
      let isMounted = true; // Track if component is mounted
      const fetchInitialData = async () => {
        const initialStates = await Promise.all(
          Array.from({ length: 51 }, (_, seatId) => getData(seatId))
        );
        if (isMounted) {
          setSeatStates(initialStates);
        }
      };
    
      fetchInitialData();
    
      return () => {
        isMounted = false; // Cleanup function
      };
    }, [getData]);
    
  
    const handleButtonClick = async (seatId) => {
      await changeData(seatId);
      // Fetch the data for the clicked seat
      const data = await getData(seatId);
      // Update the seatStates with the fetched data
      setSeatStates((prev) => {
        const newStates = [...prev];
        newStates[seatId] = data; // Store the data for the specific seat
        return newStates;
      });
    };
  
    const seats = Array.from({ length: 51 }, (_, i) => {
      const seatId = i+87; // Adjust the seat ID
      const isBlack = seatStates[seatId] === true; // Check if seat data is true
  
      return (
        <div key={seatId} className={`seat ${isBlack ? 'black' : 'yellow'}`}>
          <button onClick={() => handleButtonClick(seatId)}>
            Seat {i + 1}
          </button>
        </div>
      );
    });
  
    return <div>{seats}</div>;
  }

export default YellowZone;
