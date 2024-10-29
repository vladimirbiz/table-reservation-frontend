import React, { useState, useEffect } from 'react';
import "./Zone.css";

function RedZone({ changeData, getData }) {
  const [seatStates, setSeatStates] = useState(Array(87).fill(null)); // Array to hold seat data

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    const fetchInitialData = async () => {
      const initialStates = await Promise.all(
        Array.from({ length: 87 }, (_, seatId) => getData(seatId))
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
    let value_for_seat = seatStates[seatId];
        if(value_for_seat === 2){
            value_for_seat = 0;
        }
        else{
            value_for_seat +=1;
        }
    await changeData(seatId, value_for_seat);
    // Fetch the data for the clicked seat
    const data = await getData(seatId);
    // Update the seatStates with the fetched data
    setSeatStates((prev) => {
      const newStates = [...prev];
      newStates[seatId] = data; // Store the data for the specific seat
      return newStates;
    });
  };

  const seats = Array.from({ length: 87 }, (_, i) => {
    const seatId = i; // Adjust the seat ID
    const isBlack = seatStates[seatId] === 2;
    const isWhite = seatStates[seatId] === 1; // Check if seat data is true

    return (
        <button key={seatId} className={`seat ${isBlack? 'black' : isWhite ? "white" : "white-red"}`} onClick={() => handleButtonClick(seatId)}>
          {i + 1}
        </button>
    );
  });

  return <div>{seats}</div>;
}

export default RedZone;
