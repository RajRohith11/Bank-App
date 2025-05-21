import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
  const [formData, setFormData] = useState({
    account_number: '',
    amount: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api-test-t61h.onrender.com/api/transactions/withdraw/', {
        account_number: formData.account_number,
        amount: parseFloat(formData.amount)
      });
      setMessage('Withdrawal successful!');
      setFormData({ account_number: '', amount: '' });
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error(error);
      setMessage('Withdrawal failed. Please check the account number or balance.');
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4 text-center text-danger">Withdraw Funds</h2>
      <form onSubmit={handleSubmit} className="p-4 border border-danger rounded bg-dark">
        <div className="mb-3">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            name="account_number"
            className="form-control"
            value={formData.account_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <button type="submit" className="btn btn-skyred w-100">Withdraw</button>
      </form>

      {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
    </div>
  );
};

export default Withdraw;
