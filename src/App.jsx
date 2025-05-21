import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateCustomer from './pages/CreateCustomer';
import CreateAccount from './pages/CreateAccount';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import UpdateAccount from './pages/UpdateAccount';
import Transfer from './pages/TransferAmount';
import DeleteAccount from './pages/DeleteAccount';
import TransactionHistory from './pages/TransactionHistory';
import ShowAllCustomers from './pages/AllCustomers';
import AccountDetails from './pages/Accountinfo';
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-customer" element={<CreateCustomer />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/update-account" element={<UpdateAccount />} />
         <Route path="/transfer" element={<Transfer />} />
         <Route path="/delete-account" element={<DeleteAccount />} />
         <Route path="/transaction-history" element={<TransactionHistory />} />
         <Route path="/all-customers" element={<ShowAllCustomers />} />
         <Route path="/account-info" element={<AccountDetails />} />
      </Routes>
  );
}

export default App;
