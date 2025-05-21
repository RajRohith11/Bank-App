import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, Form } from 'react-bootstrap';

const Transfer = () => {
    const [sourceAccountNumber, setSourceAccountNumber] = useState('');
    const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const data = {
            source_account_number: sourceAccountNumber,
            destination_account_number: destinationAccountNumber,
            amount: amount,
        };

        try {
            const response = await axios.post('https://api-test-t61h.onrender.com/api/transactions/transfer/', data);
            setMessage('Transfer successful');
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Transfer Money</h2>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="formSourceAccountNumber">
                    <Form.Label>Source Account Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Source Account Number"
                        value={sourceAccountNumber}
                        onChange={(e) => setSourceAccountNumber(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formDestinationAccountNumber" className="mt-3">
                    <Form.Label>Destination Account Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Destination Account Number"
                        value={destinationAccountNumber}
                        onChange={(e) => setDestinationAccountNumber(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formAmount" className="mt-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Transfer
                </Button>
            </Form>

            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <Link to="/" className="mt-3 d-block">Back to Home</Link>
        </div>
    );
};

export default Transfer;
