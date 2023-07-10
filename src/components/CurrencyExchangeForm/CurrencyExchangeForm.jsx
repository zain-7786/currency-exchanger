import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyExchangeForm.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CurrencyChart from '../CurrencyChart/CurrencyChart';

const CurrencyExchangeForm = ({ onConvert }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          'http://data.fixer.io/api/symbols?access_key=4c6c55c447aff4cce4008ea6b2313f84'
        );
        const symbols = response.data.symbols;
        const currencyList = Object.keys(symbols);
        setCurrencies(currencyList);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (location.state && location.state.formValues) {
      const { amount, sourceCurrency, targetCurrency } = location.state.formValues;
      setAmount(amount);
      setSourceCurrency(sourceCurrency);
      setTargetCurrency(targetCurrency);
    }
  }, [location.state]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSourceCurrencyChange = (e) => {
    setSourceCurrency(e.target.value);
  };

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConvert(amount, sourceCurrency, targetCurrency);
  };

  const handleMoreDetailsClick = () => {
    const formValues = {
      amount,
      sourceCurrency,
      targetCurrency,
    };

    navigate('/currency_details', { state: { formValues } });
  };

  const isCurrencyDetailsPage = location.pathname.includes('currency_details');
  const isButtonDisabled = isCurrencyDetailsPage ? 'disabled' : '';

  return (
    <>
      <h1>Currency Exchange App</h1>
    <form className="currency-form" onSubmit={handleSubmit}>
      <div className="currency-form__field">
        <label htmlFor="amount" className="currency-form__label">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          className="currency-form__input"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div className="currency-form__field">
        <label htmlFor="sourceCurrency" className="currency-form__label">
          Source Currency:
        </label>
        <select
          id="sourceCurrency"
          className="currency-form__select"
          value={sourceCurrency}
          onChange={handleSourceCurrencyChange}
        >
          <option value="">Select currency</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="currency-form__field">
        <label htmlFor="targetCurrency" className="currency-form__label">
          Target Currency:
        </label>
        <select
          id="targetCurrency"
          className="currency-form__select"
          value={targetCurrency}
          onChange={handleTargetCurrencyChange}
        >
          <option value="">Select currency</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="currency-form-buttons">
      { isButtonDisabled !== "disabled" &&
      <>
        <button type="submit" className="currency-form__button">
          Convert
        </button>
          <button
            type="button"
            className="currency-form__button more-details-button"
            onClick={handleMoreDetailsClick}
          >
            <Link to="/currency_details" className="currency-form__button">More Details...</Link>
          </button>
          </>
        }
      </div>
    </form>
    </>
  );
};

export default CurrencyExchangeForm;


