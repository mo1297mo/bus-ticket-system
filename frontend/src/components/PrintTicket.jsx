import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBus, faChair, faLuggageCart, faShoppingBag, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet/stylesheet.css';
import '../stylesheet/stylesheet-print.css';

const PrintTicket = () => {
    const location = useLocation();
    const ticket = location.state?.ticket;

    if (!ticket) {
        return <div className="alert alert-warning" role="alert">No ticket data available.</div>;
    }

    const {
        id,
        routeId,
        busId,
        sourceCity,
        destinationCity,
        departureTime,
        bookingDate,
        userName,
    } = ticket;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="ticket-container">
            <div className="ticket-header">
                <h1>Bus Ticket Details</h1>
                <div className="qr-section">
                    <QRCode value={`Ticket ID: ${ticket.id}`} />
                    <span>Ticket number {ticket.id}</span>
                </div>
            </div>

            <div className="ticket-body">
                <div className="ticket-info">
                    <p><FontAwesomeIcon icon={faUser} /> Adults <span>{ticket.userName}</span></p>
                    <p><FontAwesomeIcon icon={faLuggageCart} /> 1x Hold Luggage</p>
                    <p><FontAwesomeIcon icon={faSuitcase} /> 1x Hand Luggage</p>
                    <p><FontAwesomeIcon icon={faBus} /> Seat <span>18D</span></p>
                </div>
                <div className="ticket-travel-info">
                    <p>From: {ticket.sourceCity}</p>
                    <p>To: {ticket.destinationCity}</p>
                    <p>Departure: {ticket.departureTime}</p>
                    <p>Booking Date: {ticket.bookingDate}</p>
                </div>
            </div>

            <button onClick={handlePrint} className="print-button">Print Ticket</button>
        </div>

    );
};

export default PrintTicket;
