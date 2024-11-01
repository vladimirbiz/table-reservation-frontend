import React, { useState, useEffect } from 'react';
import "./Zone.css";

function YellowZone({ changeData, getData, initialData }) {
    const [seatStates, setSeatStates] = useState(Array(147).fill(null)); // Initialize for 147 seats

    useEffect(() => {
      console.log('Initial Data:', initialData);
      if (initialData && Array.isArray(initialData)) {
        const states = Array(147).fill(null);
        initialData.forEach(item => {
          const seatId = parseInt(item.id, 10); // Convert id to a number
          if (seatId >= 138 && seatId <= 147) { // Only process IDs 1 through 87
            states[seatId] = item.value; // Set the state for the specific seat
          }
        });
        setSeatStates(states); // Update the seat states
      }
    }, [initialData]);
  
    const handleButtonClick = async (seatId) => {
      let value_for_seat = seatStates[(seatId + 138)];
      if (typeof value_for_seat !== 'number') {
        value_for_seat = 0; // Default to 0 if not a number
      }
  
      // Increment or reset the value for the seat
      value_for_seat = (value_for_seat == 2) ? 0 : value_for_seat + 1;
  
      // Call changeData with seatId and value_for_seat
      await changeData((seatId + 138), value_for_seat);
  
      // Fetch the updated data for the clicked seat
      const data = await getData(seatId + 138);
      
      // Update the seatStates with the fetched data
      setSeatStates((prev) => {
        const newStates = [...prev];
        newStates[seatId + 138] = data; // Store the data for the specific seat
        return newStates;
      });
    };
  
    // Create an array for buttons ordered by seat IDs 1 through 87
    const seats = seatStates.slice(138, 147).map((state, index) => {
      const seatId = index + 1; // Seat IDs should be 1 through 87
      const isBlack = state === 2;
      const isWhite = state === 1;
      const isGreen = state === 0;
  
      return (
        <button 
          key={seatId} 
          className={`seat ${isBlack ? 'black' : isWhite ? "white" : isGreen? "white-green" : "blank"}`} 
          onClick={() => handleButtonClick(seatId - 1)}
        >
          {seatId}
        </button>
      );
    });
  
    return <div className='seatDiv'>{seats}</div>;
  }
export default YellowZone;
