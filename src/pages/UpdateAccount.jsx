import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateAccount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountData, setAccountData] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFetch = async () => {
    try {
      const response = await axios.get(`https://api-test-t61h.onrender.com/api/accounts/${accountNumber}/`);
      setAccountData(response.data);
      setMessage('');
    } catch (err) {
      setMessage('Account not found.');
      setAccountData(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['name', 'email', 'phone'].includes(name)) {
      setAccountData({
        ...accountData,
        customer: { ...accountData.customer, [name]: value },
      });
    } else {
      setAccountData({
        ...accountData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://api-test-t61h.onrender.com/api/accounts/${accountNumber}/update/`, {
        account_type: accountData.account_type,
        balance: parseFloat(accountData.balance),
        customer: {
          name: accountData.customer.name,
          email: accountData.customer.email,
          phone: accountData.customer.phone,
        },
      });
      setMessage('Account and customer updated successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage('Update failed.');
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="text-center text-danger mb-4">Update Account & Customer</h2>

      <div className="mb-3">
        <label className="form-label">Enter Account Number</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
          <button className="btn btn-skyred" onClick={handleFetch}>Fetch</button>
        </div>
      </div>

      {accountData && (
        <form onSubmit={handleUpdate} className="p-4 border border-danger rounded bg-dark">
          <h5 className="text-danger">Customer Info</h5>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={accountData.customer.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={accountData.customer.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={accountData.customer.phone}
              onChange={handleChange}
              required
            />
          </div>

          <h5 className="text-danger mt-4">Account Info</h5>
          <div className="mb-3">
            <label className="form-label">Account Type</label>
            <select
              name="account_type"
              className="form-select"
              value={accountData.account_type}
              onChange={handleChange}
            >
              <option value="savings">Savings</option>
              <option value="checking">Checking</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Balance</label>
            <input
              type="number"
              name="balance"
              className="form-control"
              value={accountData.balance}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-skyred w-100">Update</button>
        </form>
      )}

      {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
    </div>
  );
};

export default UpdateAccount;
