import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OverlaySettings = () => {
    // State variables
    const [settings, setSettings] = useState([]); 
    const [newSetting, setNewSetting] = useState({ name: '', value: '' }); 

    // Fetch settings from the server when the component mounts
    useEffect(() => {
        fetchSettings();
    }, []);

    // Function to fetch overlay settings from the server
    const fetchSettings = async () => {
        try {
            const response = await axios.get('/overlay_settings'); // Make GET request to fetch settings
            setSettings(response.data); 
        } catch (error) {
            console.error('Error fetching settings:', error); 
        }
    };

    // Function to handle input changes in the form for adding a new setting
    const handleInputChange = (e) => {
        setNewSetting({
            ...newSetting,
            [e.target.name]: e.target.value
        });
    };

    // Function to create a new setting
    const handleCreateSetting = async () => {
        try {
            await axios.post('/overlay_settings', newSetting);
            setNewSetting({ name: '', value: '' }); 
            fetchSettings(); 
        } catch (error) {
            console.error('Error creating setting:', error); 
        }
    };

    // Function to delete an existing setting
    const handleDeleteSetting = async (id) => {
        try {
            await axios.delete(`/overlay_settings/${id}`); 
            fetchSettings();
        } catch (error) {
            console.error('Error deleting setting:', error); 
        }
    };

    return (
        <div>
            <h2>Overlay Settings</h2>
            <ul>
         
                {settings.map(setting => (
                    <li key={setting._id}>
                        {setting.name} - {setting.value}
         
                        <button onClick={() => handleDeleteSetting(setting._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* Form to add new setting */}
            <h3>Add New Setting</h3>
            <input type="text" name="name" placeholder="Name" value={newSetting.name} onChange={handleInputChange} />
            <input type="text" name="value" placeholder="Value" value={newSetting.value} onChange={handleInputChange} />
            <button onClick={handleCreateSetting}>Add Setting</button>
        </div>
    );
};

export default OverlaySettings;
