import React, { useState } from 'react';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';
import Divider from './Divider';
import SeatInfo from './SeatInfo';
import "./css/Zone.css";

function Zone({ getData, changeData,changeData2, initialData, handleReset, searchQuery, setSearchQuery, handleSearch, searchResults, date, date2, getDayOfWeek, setDate }) {

    const [seatId, setSeatId] = useState(undefined);
    const [seatIdData, setSeatIdData] = useState(null);

    // Update nameSetter when a seat is selected
    const addData = (id, value) => {
        changeData2({ id:id, value:value, name:''});
    };


    function getReserved(){
      if (!initialData) {
        return; // Prevent calling getData if initialData isn't available
      }
      let counter = 0;
      for(let i = 0; i < initialData.length; i++){
        if(initialData[i].value > 0)
          counter++;
      }
      return counter;
    }
    

    return (
        <div>{(seatId===undefined) ? (
            <div className='div1'>
                <h1 className='mainh1'>Reservations - {date}/{date2}<br></br><br></br>
                <div className='zone-container'>
                <button onClick={()=>setDate()} className='button1'>Change Date</button>
                 <span className='h4-reserved'>{getReserved()} / 138</span>
                 </div>
                </h1>
                <Divider color={"black"} />
                <div>
                    {/* Add search input field here */}
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search for a Reservation"
                            value={searchQuery}
                            onChange={(e) => {setSearchQuery(e.target.value);
                              handleSearch();}
                            }
                            className='search-input'
                        />
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
        if (Number(guest.id) + 1 < 88) {
          seatNumber = Number(guest.id) + 1;
          seatZone = "Red";
        } else if (Number(guest.id) + 1 < 139) {
          seatNumber = Number(guest.id) + 1 - 87;
          seatZone = "Yellow";
        } else {
          seatNumber = Number(guest.id) + 1 - 138;
          seatZone = "Green";
        }

        return (
          <div key={guest.id}>
            <p>Name: {guest.name}</p>
            <p>Status: {guest.value ? "Reserved" : "Available"}</p>
            <p>Table {seatNumber}</p>
            <p>{seatZone} Zone</p>
          </div>
        );
      })
    ) : (
      <p>{searchResults}</p>
    )}
  </div>
)}

                    </div>
                    <Divider color={"black"}/>
                    <div className='map-div'>
        <img src='https://i.imgur.com/CplK5xr.jpeg' onError={() =>(console.log("Failed to load IMAGE"))}/>
        </div>
                <Divider color={"black"} />
                <RedZone changeData={addData} getData={getData} initialData={initialData} setSeatId={setSeatId} setSeatIdData={setSeatIdData}/>
                <Divider color={"black"} />

                <YellowZone changeData={addData} getData={getData} initialData={initialData} setSeatId={setSeatId} setSeatIdData={setSeatIdData}/>

                <Divider color={"black"} />
                <GreenZone changeData={addData} getData={getData} initialData={initialData} setSeatId={setSeatId} setSeatIdData={setSeatIdData}/>
                <Divider color={"black"} />
                {/* <button onClick={handleReset}>reset</button> */}
            </div>) :
            <SeatInfo id={seatIdData.id} name={seatIdData.name} setSeatId={setSeatId} changeData={changeData} value={seatIdData.value}/>
        }
        
        </div>
    );
}

export default Zone;
