import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TransactionHistory = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    const fetchTransactions = async (e) => {
        e.preventDefault();
        setError('');
        setTransactions([]);

        try {
            const response = await axios.get(`https://api-test-t61h.onrender.com/api/transactions/${accountNumber}/`);
            console.log(response.data);
            setTransactions(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch transactions');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Transaction History</h2>

            <Form onSubmit={fetchTransactions}>
                <Form.Group controlId="accountNumber">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Get History
                </Button>
            </Form>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {transactions.length > 0 && (
                <div className="mt-4">
                    <h5>Transactions for Account #{accountNumber}</h5>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((txn) => (
                                <tr key={txn.id}>
                                    <td>{txn.transaction_type}</td>
                                    <td>₹{txn.amount}</td>
                                    <td>{new Date(txn.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            <Link to="/" className="mt-3 d-block">Back to Home</Link>
        </div>
    );
};

export default TransactionHistory;
