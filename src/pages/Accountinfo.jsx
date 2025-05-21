import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AccountSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!searchTerm) {
            setError('Please enter an account number to search.');
            return;
        }

        setLoading(true);
        setError('');
        setAccount(null);

        try {
            const response = await axios.get(`https://api-test-t61h.onrender.com/api/accounts/${searchTerm}/`);
            setAccount(response.data);
            setLoading(false);
        } catch (err) {
            setError('Account not found or invalid account number.');
            setLoading(false);
        }
    };

    const handleAccountClick = (accountNumber) => {
        navigate(`/accounts/${accountNumber}`);
    };

    return (
        <div className="container mt-5">
            <h2>Search Account</h2>

            <Form className="mb-3">
                <Form.Group controlId="searchAccount">
                    <Form.Label>Enter Account Number:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter account number"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary mt-5" onClick={handleSearch} disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Search'}
                </Button>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}

            {account && (
                <Card className="mt-3">
                    <Card.Body>
                        <h4>Account Number: {account.account_number}</h4>
                        <p><strong>Account Type:</strong> {account.account_type}</p>
                        <p><strong>Balance:</strong> ₹{account.balance}</p>
                        <p><strong>Customer Name:</strong> {account.customer.name}</p>
                        
                        <Button variant="info" onClick={() => handleAccountClick(account.account_number)}>
                            View Full Account Details
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default AccountSearch;
