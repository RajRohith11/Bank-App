import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert, Spinner } from 'react-bootstrap';

const ShowAllAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://api-test-t61h.onrender.com/api/accounts/');
                setAccounts(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch accounts');
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);  // Empty dependency array means this runs once on component mount

    return (
        <div className="container mt-5">
            <h2>All Accounts</h2>

            {loading && <Spinner animation="border" role="status" />}
            {error && <Alert variant="danger">{error}</Alert>}

            {accounts.length > 0 && !loading ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Account Number</th>
                            <th>Account Type</th>
                            <th>Balance</th>
                            <th>Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account.account_number}>
                                <td>{account.account_number}</td>
                                <td>{account.account_type}</td>
                                <td>₹{account.balance}</td>
                                <td>{account.customer.name}</td> {/* Assuming 'customer' is a related field */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                !loading && <Alert variant="info">No accounts found.</Alert>
            )}
        </div>
    );
};

export default ShowAllAccounts;
