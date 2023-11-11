import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet/stylesheet.css';


function BookingForm() {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Base URL setup
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

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
                const ticketData = response.data;
                const ticket = {
                    id: ticketData.id,
                    busId: ticketData.bus.id,
                    routeId: ticketData.bus.route.id,
                    sourceCity: ticketData.bus.route.sourceCity,
                    destinationCity: ticketData.bus.route.destinationCity,
                    departureTime: ticketData.bus.departureTime,
                    bookingDate: ticketData.bookingDate,
                    userEmail: ticketData.email,
                    userName: ticketData.username,
                    phoneNumber: ticketData.phoneNumber,
                };

                navigate('/print-ticket', { state: { ticket } });
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
        <div className="container mt-5">
            <h2 className="mb-4">Bus Booking Form</h2>
            <form>
                <div className="form-group">
                    <label>Select Route:</label>
                    <select className="form-control" value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)}>
                        <option value="">--Select Route--</option>
                        {routes.map(route => (
                            <option key={route.id} value={route.id}>{route.sourceCity} to {route.destinationCity}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Select Bus:</label>
                    <select className="form-control" value={selectedBus} onChange={e => setSelectedBus(e.target.value)}>
                        <option value="">--Select Bus--</option>
                        {buses.map(bus => (
                            <option key={bus.id} value={bus.id}>{bus.departureTime}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" value={userName} onChange={e => setUserName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="tel" className="form-control" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleBooking} disabled={isLoading}>
                    {isLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
            </form>
            <p className="mt-3">If you want to cancel an existing booking, <Link to="/cancel">click here</Link>.</p>
        </div>
    );
}

export default BookingForm;
