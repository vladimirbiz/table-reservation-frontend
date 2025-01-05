import React from 'react';
import './css/SeatInfo.css';

function SeatInfo({ id, name, setSeatId, changeData }) {
    let seatNumber;
    let seatZone;
    if(Number(Number(id) + 1) < 87){
        seatNumber = Number(Number(id) + 1);
        seatZone = "RED";
    }
    else{
        if(Number(Number(id) + 1) < 138){
            seatNumber = Number(Number(id) + 1) - 87;
            seatZone = "YELLOW";
        }
        else{
            seatNumber = Number(Number(id) + 1) - 138;
            seatZone = "GREEN";
        }
    }

    if (!id || !name) {
        return <div>No seat information available.</div>;
    }

    return (
        <div className='div-center'>
            {/* <h3 className='date-h2'>ID: {id}</h3> */}
            <h2 className='name-h2'>Table : {seatNumber} - {seatZone}</h2>
            <h2 className='name-h2-2'>Name - {name}</h2>
            <button className="seat-button" onClick={() => {changeData(id, 2, name); setSeatId(null)}} >Guest is seated</button>
            <button className="seat-button" onClick={() => {changeData(id, 0, 'no-name'); setSeatId(null)}} >Cancel Reservation</button>
            <button className="seat-button" onClick={()=>setSeatId(null)}>Done</button>
        </div>
    );
}

export default SeatInfo;
