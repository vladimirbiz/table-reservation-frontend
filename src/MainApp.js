import React, { useCallback } from 'react';
import axios from 'axios';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';
import Divider from './Divider';
import masiImage from './masi.png'; // Import the image
import "./SignIn.css";

function MainApp({ token }) {

    const changeData = async (id, value) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Value is " + value);
        try {
            const response = await axios.put(`https://localhost:5001/my/${id}/${value}`, {}, { // Add empty object here
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the request header
                }
            });
            return response; 
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };
    

    const getData = useCallback(async (id) => {

        // Wait for 3 seconds before making the request
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const response = await axios.get(`https://localhost:5001/my/${id}`,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            });
            return response.data.value; // Set the response data
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        } finally {
        }
    }, [token]);

    return (
        <div>
            
            <div>
                <h1>Reservations for Mahmut Orhan</h1>
                <div className="container">

                <div className='container'>

                <div className="item">
                <div className='glava'><span className='seat green'></span> <div>Zelena Zona</div></div>
                <div className='glava'><span className='seat yellow'></span> <div>Zolta Zona</div></div>
                <div className='glava'><span className='seat red'></span> <div>Crvena Zona</div></div>
                <div className='glava'><span className='seat'></span> <div>Rezervirana</div> </div>
                <div className='glava'><span className='seat black'></span> <div>Zafatena</div></div>
                </div>
                <img src={masiImage} className='slika' alt="Description" onError={(e) => { e.target.onerror = null; e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdaTZdJNs3SkXMeBQN7z8OuYtIseUa8KSmrA&s" }} /> {/* Use the imported image */}
                </div>
                </div>
            </div>
            <div  className="seat-block">
            <div>
                <Divider color={"red"} />
                <RedZone changeData={changeData} getData={getData} />
                <Divider color={"red"} />
            </div>
            <div>
                <Divider color={"yellow"} />
                <YellowZone changeData={changeData} getData={getData} />
                <Divider color={"yellow"} />
            </div>
            <div>
                <Divider color={"green"} />
                <GreenZone changeData={changeData} getData={getData}/>
                <Divider color={"green"} />
            </div>
            </div>
        </div>
    );
}

export default MainApp;
