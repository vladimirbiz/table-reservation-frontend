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
        await changeData(seatId); // Update the seat state in the API
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
        const isBlack = seatStates[seatId] === true; // Check if seat data is true

        return (
            <div key={index + 138} className={`seat ${isBlack ? 'black' : 'green'}`}>
                <button onClick={() => handleButtonClick(seatId)}>
                    {index + 1}
                </button>
            </div>
        );
    });

    return <div>{seats}</div>;
}

export default GreenZone;
