import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RouteSelection() {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        axios.get('/api/routes').then(response => {
            setRoutes(response.data);
        });
    }, []);

    return (
        <div>
            {/* Render the routes here. For example: */}
            <ul>
                {routes.map(route => (
                    <li key={route.id}>{route.sourceCity} to {route.destinationCity}</li>
                ))}
            </ul>
        </div>
    );
}

export default RouteSelection;
