import React, { useState } from 'react';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';
import Divider from './Divider';
import SeatInfo from './SeatInfo';
import "./css/SignIn.css";

function Zone({ getData, changeData,changeData2, initialData, handleReset, searchQuery, setSearchQuery, handleSearch, searchResults }) {

    const [seeReservation, setSeeReservation] = useState(false);
    const [seatId, setSeatId] = useState(undefined);
    const [seatIdData, setSeatIdData] = useState(null);

    // Update nameSetter when a seat is selected
    const addData = (id, value) => {
        changeData2({ id:id, value:value, name:''});
    };

    return (
        <div>{!seatId ? (
            <div>
                <h1 className='mainh1'>Table Reservations - Intermezzo</h1>
                <Divider color={"black"} />
                <div>
                    {/* Add search input field here */}
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search for a Reservation"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    {searchResults && <Divider color={"black"} />}

                    {searchResults && (
                        <div className="search-results">
                            {Array.isArray(searchResults) ? (
                                searchResults.map((guest) => (
                                    <div key={guest.id}>
                                        <p>Name: {guest.name}</p>
                                        <p>Reservation Status: {guest.value ? "Reserved" : "Available"}</p>
                                        <p>Table - {Number(guest.id) + 1}</p>
                                    </div>
                                ))
                            ) : (
                                <p>{searchResults}</p>
                            )}
                        </div>
                    )}
                    </div>
                <Divider color={"black"} />
                <RedZone changeData={addData} getData={getData} initialData={initialData} setSeeReservation={setSeeReservation} setSeatId={setSeatId} setSeatIdData={setSeatIdData}/>
                <Divider color={"black"} />

                <YellowZone changeData={addData} getData={getData} initialData={initialData} setSeeReservation={setSeeReservation} setSeatId={setSeatId} setSeatIdData={setSeatIdData}/>

                <Divider color={"black"} />
                <GreenZone changeData={addData} getData={getData} initialData={initialData} setSeeReservation={setSeeReservation} setSeatId={setSeatId} setSeatIdData={setSeatIdData}/>
                <Divider color={"black"} />
                <button onClick={handleReset}>reset</button>
            </div>) :
            <SeatInfo id={seatIdData.id} name={seatIdData.name} setSeatId={setSeatId} changeData={changeData}/>
        }
        
        </div>
    );
}

export default Zone;
