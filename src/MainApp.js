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
            console.log(response);
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

    const handleReset = async () => {
        try {
            const response = await fetch('https://localhost:5001/my/reset', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error('Failed to reset tables');
            }
    
            const data = await response.json();
            alert(data.Message); // Display success message
        } catch (error) {
            console.error('Error resetting tables:', error);
            alert('Error resetting tables. Please try again.');
        }
    };
    
    

    return (
        <div>
            
            <div>
                <h1>Table Reservations - Intermezzo</h1>
            </div>
            <div  className="seat-block">
            <div>
                <Divider color={"black"} />
                <RedZone changeData={changeData} getData={getData} />
                <Divider color={"black"} />
            </div>
            <div>
                <YellowZone changeData={changeData} getData={getData} />
                <Divider color={"black"} />
            </div>
            <div>
                <GreenZone changeData={changeData} getData={getData}/>
                <Divider color={"black"} />
            </div>
            </div>
        </div>
    );
}

export default MainApp;
