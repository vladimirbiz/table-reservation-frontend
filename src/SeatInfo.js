import React from 'react';
import './css/DatePicker.css';

function SeatInfo({ id, name, setSeatId, changeData }) {
    if (!id || !name) {
        return <div>No seat information available.</div>;
    }

    return (
        <div className='div-center'>
            {/* <h3 className='date-h2'>ID: {id}</h3> */}
            <h2 className='name-h2'>Table: {id}</h2>
            <h2 className='name-h2-2'>Name: {name}</h2>
            <button className="seat-button" onClick={() => {changeData(id, 2, name); setSeatId(null)}} >Guest is seated</button>
            <button className="seat-button" onClick={() => {changeData(id, 0, 'no-name'); setSeatId(null)}} >Cancel Reservation</button>
            <button className="seat-button" onClick={()=>setSeatId(null)}>Done</button>
        </div>
    );
}

export default SeatInfo;
