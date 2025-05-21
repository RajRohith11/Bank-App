import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DeleteAccount = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.delete(`https://api-test-t61h.onrender.com/api/accounts/${accountNumber}/delete/`);
            setMessage(response.data.message);
            setAccountNumber('');
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Delete Account</h2>
            <Form onSubmit={handleDelete}>
                <Form.Group controlId="accountNumber">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </Form.Group>

                <Button variant="danger" type="submit" className="mt-3">
                    Delete Account
                </Button>
            </Form>

            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <Link to="/" className="mt-3 d-block">Back to Home</Link>
        </div>
    );
};

export default DeleteAccount;
