import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const TicketValidator = () => {
    const { ticketID } = useParams(); // Get the ticketID from the URL
    const [ticketDetails, setTicketDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTicketDetails = async () => {
            setIsLoading(true);
            try {
                const baseURL = process.env.REACT_APP_API_BASE_URL;
                const response = await fetch(`${baseURL}/api/tickets/${ticketID}`);
                const contentType = response.headers.get('content-type');

                // Log the response for debugging
                console.log("Response Status:", response.status);
                console.log("Content Type:", contentType);

                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();
                    setTicketDetails(data);
                } else {
                    // This is where you handle non-JSON responses
                    throw new Error('Received non-JSON response from server');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTicketDetails();
    }, [ticketID]);

    // Conditional rendering based on the state
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!ticketDetails) return <div>No ticket details available.</div>;

    // Render the ticket details
    return (
        <div className="ticket-validation">
            <h1>Booking Validation</h1>
            <div className="validation-details">
                <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" className="valid-icon" />
                <h1 className="valid-text">Ticket is valid</h1>
                <p>Booking ID: {ticketDetails?.id}</p>
                <p>Full Name: {ticketDetails?.userName}</p>
            </div>
        </div>
    );
};

export default TicketValidator;
