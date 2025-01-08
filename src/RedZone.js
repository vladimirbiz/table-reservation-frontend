import React, { useState, useEffect } from 'react';
import "./css/Zone.css";

function RedZone({ changeData, getData, initialData, setSeatId, setSeatIdData }) {
  const [seatStates, setSeatStates] = useState(Array(147).fill(null)); // Initialize for 147 seats

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      const states = Array(147).fill(null);
      initialData.forEach(item => {
        const seatId = parseInt(item.id, 10); // Convert id to a number
        if (seatId >= 0 && seatId <= 86) { // Only process IDs 1 through 87
          states[seatId] = item.value; // Set the state for the specific seat
        }
      });
      setSeatStates(states); // Update the seat states
    }
  }, [initialData]);

  const handleReservation = async (seatId) => {
    if (!initialData) {
      return; // Prevent calling getData if initialData isn't available
    }
    console.log( "seatID: "+ seatId )
    let objvalue = "";
    let objid = null;
    let objname = undefined;
    console.log("In handle reservation: ")
    console.log({initialData});
      for (let i in initialData) {
          if (Number(initialData[i].id) === seatId) {
              objvalue = initialData[i].value;
              objid = initialData[i].id;
              objname = initialData[i].name;
              await setSeatIdData({id: objid, value:objvalue, name: objname})
              await setSeatId(seatId);
              break;
          }
         } // Wait for data to be fetched
  };

  const handleButtonClick = async (seatId) => {
    let value_for_seat = seatStates[seatId];
    if (typeof value_for_seat !== 'number') {
      value_for_seat = 0; // Default to 0 if not a number
    }

    value_for_seat = (value_for_seat === 2) ? 0 : value_for_seat + 1;

    await changeData(seatId, value_for_seat);

    const data = await getData(seatId, initialData);
    setSeatIdData(data);

    setSeatStates((prev) => {
      const newStates = [...prev];
      newStates[seatId] = data; // Store the data for the specific seat
      return newStates;
    });
  };

  const seats = seatStates.slice(0, 87).map((state, index) => {
    const seatId = index + 1; // Seat IDs should be 1 through 87
    const isBlack = state === 2;
    const isWhite = state === 1;
    const isRed = state === 0;

    return (
      <button
        key={seatId}
        className={`seat ${isBlack ? 'black' : isWhite ? "white" : isRed ? "white-red" : "blank"}`}
        onClick={() => {
          if (isBlack || isWhite) {
            handleReservation(seatId - 1); // Call handleReservation if the seat is black or white
          } else {
            handleButtonClick(seatId - 1); // Otherwise, call handleButtonClick
          }
        }}
      >
        {seatId}
      </button>
    );
  });

  return <div className='seatDiv'>{seats}</div>;
}

export default RedZone;
