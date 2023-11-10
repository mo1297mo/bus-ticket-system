import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TicketValidator = () => {
    const { ticketID } = useParams(); // Get the ticketID from the URL
    const [ticketDetails, setTicketDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const response = await fetch(`/api/tickets/${ticketID}`);
                if (!response.ok) {
                    throw new Error('Ticket not found or error fetching ticket details');
                }
                const data = await response.json();
                setTicketDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTicketDetails(); // No need for the if check since ticketID is always provided
    }, [ticketID]); // Dependency array ensures useEffect is called when ticketID changes

    // Conditional rendering based on the state
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!ticketDetails) return <div>No ticket details available.</div>;

    // Render the ticket details
    return (
        <div>
            <h1>Ticket Details</h1>
            <p>ID: {ticketDetails.id}</p>
            <p>Bus ID: {ticketDetails.bus.id}</p>
            <p>Route ID: {ticketDetails.bus.route.id}</p>
            <p>Source City: {ticketDetails.bus.route.sourceCity}</p>
            <p>Destination City: {ticketDetails.bus.route.destinationCity}</p>
            <p>Departure Time: {ticketDetails.bus.departureTime}</p>
            <p>Booking Date: {ticketDetails.bookingDate}</p>
            <p>Email: {ticketDetails.email}</p>
            <p>Username: {ticketDetails.username}</p>
            <p>Phone Number: {ticketDetails.phoneNumber}</p>
        </div>
    );
};

export default TicketValidator;
