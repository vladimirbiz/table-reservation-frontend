import React from 'react';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';
import Divider from './Divider';

function Zone({ getData, changeData, initialData, handleReset }) {

    // Update nameSetter when a seat is selected
    const addData = (id, value) => {
        changeData({ id, value, name: '' }); // Initialize with id, value, and empty name
    };

    return (
        <div>
            <Divider color={"black"} />
            <RedZone changeData={addData} getData={getData} initialData={initialData} />
            <Divider color={"black"} />

            <YellowZone changeData={addData} getData={getData} initialData={initialData} />

            <Divider color={"black"} />
            <GreenZone changeData={addData} getData={getData} initialData={initialData} />
            <Divider color={"black"} />
            <button onClick={handleReset}>reset</button>
        </div>
    );
}

export default Zone;
