import React, { useState } from 'react';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';
import Divider from './Divider';
import SeatInfo from './SeatInfo';
import "./css/Zone.css";

function Zone({ getData, changeData,changeData2, initialData, handleReset, searchQuery, setSearchQuery, handleSearch, searchResults }) {

    const [seeReservation, setSeeReservation] = useState(false);
    const [seatId, setSeatId] = useState(undefined);
    const [seatIdData, setSeatIdData] = useState(null);
      let seatNumber;
    let seatZone;

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
      searchResults.map((guest) => {
        // Declare seatNumber and seatZone variables
        let seatNumber;
        let seatZone;

        // Calculate seatNumber and seatZone based on guest.id
        if (Number(guest.id) + 1 < 87) {
          seatNumber = Number(guest.id) + 1;
          seatZone = "RED";
        } else if (Number(guest.id) + 1 < 138) {
          seatNumber = Number(guest.id) + 1 - 87;
          seatZone = "YELLOW";
        } else {
          seatNumber = Number(guest.id) + 1 - 138;
          seatZone = "GREEN";
        }

        return (
          <div key={guest.id}>
            <p>Name: {guest.name}</p>
            <p>Reservation Status: {guest.value ? "Reserved" : "Available"}</p>
            <p>Table - {seatNumber}</p>
            <p>Zone - {seatZone}</p>
          </div>
        );
      })
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
