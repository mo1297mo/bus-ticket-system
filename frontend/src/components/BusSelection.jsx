import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BusSelection({ match }) {
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        axios.get(`/api/buses/${match.params.routeId}`).then(response => {
            setBuses(response.data);
        });
    }, [match.params.routeId]);

    return (
        <div>
            <ul>
                {buses.map(bus => (
                    <li key={bus.id}>
                        Departure Time: {bus.departureTime}
                        <button onClick={() => bookTicket(bus.id)}>Book</button>
                    </li>
                ))}
            </ul>
        </div>
    );

    function bookTicket(busId) {
        // Logic to book the ticket for the selected bus.
        // This can involve redirecting to a booking confirmation page or directly calling an API to book.
    }
}

export default BusSelection;
