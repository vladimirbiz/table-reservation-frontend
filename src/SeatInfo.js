import React from 'react';
import './css/SeatInfo.css';

function SeatInfo({ id, name, setSeatId, changeData, value }) {
    let seatNumber;
    let seatZone;

    // Simplify the logic for calculating seatNumber and seatZone
    const seatId = Number(id) + 1;

    if (seatId < 88) {
        seatNumber = seatId;
        seatZone = "Red";
    } else if (seatId < 139) {
        seatNumber = seatId - 87;
        seatZone = "Yellow";
    } else {
        seatNumber = seatId - 138;
        seatZone = "Green";
    }

    if (!id || !name) {
        return <div>No seat information available.</div>;
    }

    // Render based on the value prop
    return (
        <div className='div-center'>
            <h2 className='name-h2'>Table {seatNumber} - {seatZone} Zone</h2>
            <h2 className='name-h2-2'>{name}</h2>
            {value === 1 ? (
                <>
                    <button className="seat-button" onClick={() => { changeData(id, 2, name); setSeatId(undefined); }}>Guest is seated</button>
                    <button className="seat-button" onClick={() => { changeData(id, 0, 'no-name'); setSeatId(undefined); }}>Cancel Reservation</button>
                </>
            ) : (
                <button className="seat-button" onClick={() => { changeData(id, 0, 'no-name'); setSeatId(undefined); }}>Cancel Reservation</button>
            )}
            <button className="seat-button seat-button-done" onClick={() => setSeatId(undefined)}>Done</button>
        </div>
    );
}

export default SeatInfo;

