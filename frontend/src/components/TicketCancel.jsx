import React, { useState } from 'react';

const CancelTicket = () => {
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setId(e.target.value);
    };

    const cancelTicket = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/tickets/cancel/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessage('Ticket successfully canceled.');
            } else {
                setMessage('Failed to cancel ticket. Please check the ID and try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        cancelTicket();
    };

    return (
        <div>
            <h2>Cancel Ticket</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Ticket ID:
                    <input type="text" value={id} onChange={handleInputChange} />
                </label>
                <button type="submit">Cancel Ticket</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CancelTicket;
