import React, { useState } from 'react';
import "./DatePicker.css";

function NameForm({ changeData, setNameSetter, nameSetter }) {
    const [name, setName] = useState(nameSetter.name || ''); // Initialize name from nameSetter if available

    const handleDateChange = async (event) => {
        event.preventDefault();
        
        // Update nameSetter with the new name
        await changeData(nameSetter.id, nameSetter.value, name);  // Call the changeData function with the name

        // Optionally clear the name field after submission
        setName('');  // Reset the input field
        setNameSetter(undefined);
        // After submission, you can clear nameSetter and go back to the Zone
        // In this case, you can reset nameSetter to null or update it as needed
    };

    return (
        <div className="date-picker">
            <h1 className='date-h2'>Insert a name for the reservation</h1>
            <form onSubmit={handleDateChange}>
                <input 
                    type="text" 
                    className="name-input" 
                    value={name}  // Controlled input
                    onChange={(e) => setName(e.target.value)}  // Update name on change
                    placeholder="Enter Name" 
                />
                <button className="date-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NameForm;
