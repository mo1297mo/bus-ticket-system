import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingForm() {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        // Fetch the routes
        axios.get('/api/routes')
            .then(response => {
                setRoutes(response.data);
            })
            .catch(error => {
                console.error("Error fetching routes:", error);
            });
    }, []);

    useEffect(() => {
        if (selectedRoute) {
            // Fetch the buses for the selected route
            axios.get(`/api/buses/${selectedRoute}`)
                .then(response => {
                    setBuses(response.data);
                })
                .catch(error => {
                    console.error("Error fetching buses:", error);
                });
        }
    }, [selectedRoute]);

    const handleBooking = () => {
        const bookingDetails = {
            routeId: selectedRoute,
            busId: selectedBus,
            userName: userName,
            userEmail: userEmail
        };
        axios.post('/api/tickets/book', bookingDetails)
            .then(response => {
                alert('Booking confirmed!');
            })
            .catch(error => {
                console.error("Error during booking:", error);
            });
    };

    return (
        <div>
            <h2>Booking Form</h2>
            <div>
                <label>Select Route:</label>
                <select onChange={e => setSelectedRoute(e.target.value)}>
                    <option value="">--Select Route--</option>
                    {routes.map(route => (
                        <option key={route.id} value={route.id}>{route.sourceCity} to {route.destinationCity}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Bus:</label>
                <select onChange={e => setSelectedBus(e.target.value)}>
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
            <button onClick={handleBooking}>Confirm Booking</button>
        </div>
    );
}

export default BookingForm;
