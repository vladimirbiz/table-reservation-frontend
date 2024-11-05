import React from 'react';

function SeatInfo({ id, name, setSeatId, changeData }) {
    if (!id || !name) {
        return <div>No seat information available.</div>;
    }

    return (
        <div>
            <h2 className='date-h2'>Seat Information</h2>
            {/* <h3 className='date-h2'>ID: {id}</h3> */}
            <h3 className='date-h2'>Name: {name}</h3>
            <button className="seat-button" onClick={() => {changeData(id, 2, name); setSeatId(null)}} >isSeated</button>
            <button className="seat-button" onClick={()=>setSeatId(null)}>Back to table view</button>
            <button className="seat-button" onClick={() => {changeData(id, 0, 'no-name'); setSeatId(null)}} >Cancel Reservation</button>
        </div>
    );
}

export default SeatInfo;
