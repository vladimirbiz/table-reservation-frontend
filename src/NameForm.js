import React, { useState } from 'react';
import "./css/DatePicker.css";

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

    const handleCancel = async () =>{
        setNameSetter(undefined);
    }

    return (
        <div className="div-center">
            <div className='name-div'>
            <h1 className='name-h1'>Table reserved for:</h1>
            <form onSubmit={handleDateChange}>
                <input 
                    type="text" 
                    className="name-input" 
                    value={name}  // Controlled input
                    onChange={(e) => setName(e.target.value)}  // Update name on change
                    placeholder="" 
                />
                <button className="name-button" type="submit">Submit</button>
                
            </form>
            <button className='cancel-button' onClick={()=>handleCancel()}>Cancel</button>
            </div>
        </div>
    );
}

export default NameForm;
