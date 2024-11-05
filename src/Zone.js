import React, { useState } from 'react';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';
import Divider from './Divider';
import SeatInfo from './SeatInfo';

function Zone({ getData, changeData, initialData, handleReset }) {

    const [seeReservation, setSeeReservation] = useState(false);
    const [seatId, setSeatId] = useState(undefined);
    const [seatIdData, setSeatIdData] = useState(null);

    // Update nameSetter when a seat is selected
    const addData = (id, value) => {
        changeData({ id, value, name: '' }); // Set name to empty initially
    };

    return (
        <div>{!seatId ? (
            <div>
                <Divider color={"black"} />
                <RedZone changeData={addData} getData={getData} initialData={initialData} setSeeReservation={setSeeReservation} setSeatId={setSeatId} setSeatIdData={setSeatIdData} />
                <Divider color={"black"} />

                <YellowZone changeData={addData} getData={getData} initialData={initialData} setSeeReservation={setSeeReservation} setSeatId={setSeatId}  />

                <Divider color={"black"} />
                <GreenZone changeData={addData} getData={getData} initialData={initialData} setSeeReservation={setSeeReservation} setSeatId={setSeatId}  />
                <Divider color={"black"} />
                <button onClick={handleReset}>reset</button>
            </div>) :
            <SeatInfo id={seatIdData.id} name={seatIdData.name} />
        }
        
        </div>
    );
}

export default Zone;
