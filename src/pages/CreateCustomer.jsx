import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('https://api-test-t61h.onrender.com/api/customers/create/', formData);
      setMessage('Customer created successfully!');
      setFormData({ name: '', email: '', phone: '' });

      // Optionally redirect after a second
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error(error);
      setMessage('Error creating customer. Please try again.');
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4 text-center text-danger">Create Customer</h2>
      <form onSubmit={handleSubmit} className="p-4 border border-danger rounded bg-dark">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-skyred w-100">Create</button>
      </form>

      {message && (
        <div className="alert alert-info mt-3 text-center">{message}</div>
      )}
    </div>
  );
};

export default CreateCustomer;
