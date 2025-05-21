import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/colors.css'

const Home = () => {
  const actions = [
    { name: 'Create Customer', path: '/create-customer' },
    { name: 'Create Account', path: '/create-account' },
    { name: 'Account Info', path: '/account-info' },
    { name: 'Deposit', path: '/deposit' },
    { name: 'Withdraw', path: '/withdraw' },
    { name: 'Update Account', path: '/update-account' },
    { name: 'Transfer Amount', path: '/transfer' },
    { name: 'Transaction History', path: '/transaction-history' },
    { name: 'Delete Account', path: '/delete-account' },
    { name: 'Show All Accounts', path: '/all-customers' },

  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Bank App</h2>
      <div className="row">
        {actions.map((action, index) => (
          <div key={index} className="col-md-6 col-sm-12 mb-3">
            <Link to={action.path} className="btn btn-skyred w-100 py-3">
              {action.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
