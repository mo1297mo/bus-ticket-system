import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function BookingForm() {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Base URL setup
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || REACT_APP_API_BASE_URL;

    useEffect(() => {
        // Fetch the routes
        axios.get('/api/routes')
            .then(response => {
                setRoutes(response.data);
            })
            .catch(error => {
                console.error("Error fetching routes:", error);
                alert("Failed to fetch routes. Please try again.");
            });
    }, []);

    useEffect(() => {
        if (selectedRoute) {
            // Fetch the buses for the selected route
            axios.get(`/api/routes/${selectedRoute}/buses`)
                .then(response => {
                    setBuses(response.data);
                })
                .catch(error => {
                    console.error("Error fetching buses:", error);
                    alert("Failed to fetch buses for the selected route. Please try again.");
                });
        }
    }, [selectedRoute]);

    const resetForm = () => {
        setSelectedRoute('');
        setSelectedBus('');
        setUserName('');
        setUserEmail('');
        setPhoneNumber('');
    };

    const handleBooking = () => {
        // Basic validation for phone number format
        const phonePattern = /^\+\d{11,14}$/; // Simple regex for international phone numbers
        if (!phonePattern.test(phoneNumber)) {
            alert('Please enter a valid phone number in international format.');
            return;
        }

        setIsLoading(true);
        const bookingDetails = {
            routeId: selectedRoute,
            busId: selectedBus,
            userName: userName,
            userEmail: userEmail,
            phoneNumber: phoneNumber  // Corrected to match the backend DTO
        };

        axios.post('/api/tickets/book', bookingDetails)
            .then(response => {
                alert('Booking confirmed! We just sent you a SMS with your ticket code.');
                resetForm();
            })
            .catch(error => {
                console.error("Error during booking:", error);
                alert('Booking failed. Please try again.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            <h2>Booking Form</h2>
            <div>
                <label>Select Route:</label>
                <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)}>
                    <option value="">--Select Route--</option>
                    {routes.map(route => (
                        <option key={route.id} value={route.id}>{route.sourceCity} to {route.destinationCity}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Bus:</label>
                <select value={selectedBus} onChange={e => setSelectedBus(e.target.value)}>
                    <option value="">--Select Bus--</option>
                    {buses.map(bus => (
                        <option key={bus.id} value={bus.id}>{bus.departureTime}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Name:</label>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                />
            </div>
            <button onClick={handleBooking} disabled={isLoading}>
                {isLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
            <p>If you want to cancel an existing booking, <Link to="/cancel">click here</Link>.</p>
        </div>
    );
}

export default BookingForm;
