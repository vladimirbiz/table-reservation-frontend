import React, { useState, useEffect } from 'react';
import "./Zone.css";

function GreenZone({ changeData, getData }) {
    const totalSeats = 9; // Total seats in this zone (from 138 to 146)
    const [seatStates, setSeatStates] = useState(Array(totalSeats).fill(null)); // Initialize state for 9 seats

    useEffect(() => {
        let isMounted = true; // Track if component is mounted
        const fetchInitialData = async () => {
            const initialStates = await Promise.all(
                Array.from({ length: totalSeats }, (_, index) => getData(index + 138)) // Fetch data from API indices
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

    const handleButtonClick = async (index) => {
        const seatId = index + 138; // Calculate the actual seat ID for the API
        console.log("//////////////////////////////////////");
        console.log(seatStates[seatId]);
        let value_for_seat = seatStates[index];
        if(value_for_seat === 2){
            value_for_seat = 0;
        }
        else{
            value_for_seat +=1;
        }
        await changeData(seatId, value_for_seat); // Update the seat state in the API
        const data = await getData(seatId); // Fetch the updated data for the clicked seat
        // Update the seatStates with the fetched data
        setSeatStates((prev) => {
            const newStates = [...prev];
            newStates[index] = data; // Store the data for the specific seat
            return newStates;
        });
    };

    const seats = Array.from({ length: totalSeats }, (_, index) => {
        const seatId = index; // Use local index for seatStates
        const isBlack = seatStates[seatId] === 2; // Check if seat data is true
        const isWhite = seatStates[seatId] === 1;

        return (
                <button key={index + 138} className={`seat ${isBlack ? 'black' : isWhite ? "white" : "green"}`} onClick={() => handleButtonClick(seatId)}>
                    {index + 1}
                </button>
        );
    });

    return <div>{seats}</div>;
}

export default GreenZone;
