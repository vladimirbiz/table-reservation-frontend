import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import RedZone from './RedZone';
import YellowZone from './YellowZone';
import GreenZone from './GreenZone';
import Divider from './Divider';
import masiImage from './masi.png'; // Import the image

function MainApp({ token }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const changeData = async (id, value) => {
        setLoading(true); // Start loading animation
        await new Promise(resolve => setTimeout(resolve, 1000));
        value = Number(value);
        try {
            const response = await axios.put(`https://localhost:5001/my/${id}/${value}`);
            setData(response.data);
            return response; // Set the response data
        } catch (error) {
            console.error('There was an error fetching the data!', error);
            setError(error); // Set error if any
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    const getData = useCallback(async (id) => {
        setLoading(true); // Start loading animation

        // Wait for 3 seconds before making the request
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const response = await axios.get(`https://localhost:5001/my/${id}`);
            setData(response.data);
            return response.data.value; // Set the response data
        } catch (error) {
            console.error('There was an error fetching the data!', error);
            setError(error); // Set error if any
        } finally {
            setLoading(false); // Stop loading animation
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading animation

            try {
                const response = await axios.get('https://localhost:5001/my');
                setData(response.data); // Set the response data
            } catch (error) {
                console.error('There was an error fetching the data!', error);
                setError(error); // Set error if any
            } finally {
                setLoading(false); // Stop loading animation
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            
            <div>
                <h1>Reservations for Mahmut Orhan</h1>
                <div class="container">

                <div className='container'>

                <div class="item">
                <div className='glava'><span className='seat green'></span> <div>Zelena Zona</div></div>
                <div className='glava'><span className='seat yellow'></span> <div>Zolta Zona</div></div>
                <div className='glava'><span className='seat red'></span> <div>Crvena Zona</div></div>
                <div className='glava'><span className='seat'></span> <div>Rezervirana</div> </div>
                <div className='glava'><span className='seat black'></span> <div>Zafatena</div></div>
                </div>
                <img src={masiImage} className='slika' alt="Description of image" /> {/* Use the imported image */}
                </div>
                </div>
            </div>
            <div className="seat-block">
                <Divider color={"red"} />
                <RedZone changeData={changeData} getData={getData} />
                <Divider color={"red"} />
            </div>
            <div className="seat-block">
                <Divider color={"yellow"} />
                <YellowZone changeData={changeData} getData={getData} />
                <Divider color={"yellow"} />
            </div>
            <div className="seat-block">
                <Divider color={"green"} />
                <GreenZone changeData={changeData} getData={getData} />
                <Divider color={"green"} />
            </div>
        </div>
    );
}

export default MainApp;
