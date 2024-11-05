import React from 'react';

function SeatInfo({ id, name }) {
    if (!id || !name) {
        return <div>No seat information available.</div>;
    }

    return (
        <div>
            <h3>Seat Information</h3>
            <p>ID: {id}</p>
            <p>Name: {name}</p>
        </div>
    );
}

export default SeatInfo;
