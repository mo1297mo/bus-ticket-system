import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingForm() {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Base URL setup
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

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
        setSelectedRoute(null);
        setSelectedBus(null);
        setUserName("");
        setUserEmail("");
    };

    const handleBooking = () => {
        setIsLoading(true);
        const bookingDetails = {
            routeId: selectedRoute,
            busId: selectedBus,
            userName: userName,
            userEmail: userEmail
        };
        axios.post('/api/tickets/book', bookingDetails)
            .then(response => {
                alert('Booking confirmed!');
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
                <select value={selectedRoute || ''} onChange={e => setSelectedRoute(e.target.value)}>
                    <option value="">--Select Route--</option>
                    {routes.map(route => (
                        <option key={route.id} value={route.id}>{route.sourceCity} to {route.destinationCity}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Bus:</label>
                <select value={selectedBus || ''} onChange={e => setSelectedBus(e.target.value)}>
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
            <button onClick={handleBooking} disabled={isLoading}>
                {isLoading ? "Booking..." : "Confirm Booking"}
            </button>
        </div>
    );
}

export default BookingForm;
