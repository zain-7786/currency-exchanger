import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import CurrencyExchangeForm from './components/CurrencyExchangeForm/CurrencyExchangeForm';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/currency_details" element={<CurrencyExchangeForm />} />
      </Routes>
    </Router>
  );
};

export default App;
