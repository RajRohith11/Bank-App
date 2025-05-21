import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    account_number: '',
    account_type: 'savings',
    balance: '',
    customer_id: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://api-test-t61h.onrender.com/api/customers/')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('	https://api-test-t61h.onrender.com/api/accounts/create/', formData);
      setMessage('Account created successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage('Error creating account.');
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4 text-center text-danger">Create Account</h2>
      <form onSubmit={handleSubmit} className="p-4 border border-danger rounded bg-dark">
        <div className="mb-3">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            className="form-control"
            name="account_number"
            value={formData.account_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Account Type</label>
          <select
            className="form-select"
            name="account_type"
            value={formData.account_type}
            onChange={handleChange}
          >
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Initial Balance</label>
          <input
            type="number"
            className="form-control"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Customer</label>
          <select
            className="form-select"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.email})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-skyred w-100">Create Account</button>
      </form>

      {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
    </div>
  );
};

export default CreateAccount;
