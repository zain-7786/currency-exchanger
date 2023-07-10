import React, { useEffect, useState } from 'react';
import CurrencyExchangeForm from '../../components/CurrencyExchangeForm/CurrencyExchangeForm';
import CurrencyDisplay from '../../components/currencyDisplay';
import currencyAPI from '../../api/currencyAPI';
import convertCurrency from '../../utils/currencyConverter';
import './HomePage.css';
import CurrencyCardGrid from '../../components/CurrencyCardGrid/CurrencyCardGrid';

const HomePage = () => {
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedValue, setConvertedValue] = useState('');

  const popularCurrencies = [
    { currency: 'USD', exchangeRate: 1.18 },
    { currency: 'EUR', exchangeRate: 1 },
    { currency: 'GBP', exchangeRate: 0.85 },
    { currency: 'USD', exchangeRate: 1.18 },
    { currency: 'EUR', exchangeRate: 1 },
    { currency: 'GBP', exchangeRate: 0.85 },
    { currency: 'USD', exchangeRate: 1.18 },
    { currency: 'EUR', exchangeRate: 1 },
    { currency: 'GBP', exchangeRate: 0.85 },
  ];

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const { symbols } = await currencyAPI.fetchExchangeRates();
        const currencyList = Object.keys(symbols);
        setCurrencies(currencyList);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    const fetchRates = async () => {
      try {
        const { rates } = await currencyAPI.fetchExchangeRates();
        setExchangeRates(rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchCurrencies();
    fetchRates();
  }, []);

  const handleConvert = (amount, sourceCurrency, targetCurrency) => {
    const converted = convertCurrency(
      amount,
      sourceCurrency,
      targetCurrency,
      exchangeRates
    );
    setConvertedValue(converted);
  };

  return (
    <>
      <div className='currency-app-container'>
        <CurrencyExchangeForm currencies={currencies} onConvert={handleConvert} />
        {convertedValue && <CurrencyDisplay convertedValue={convertedValue} />}
        
        <h2>Popular Currencies</h2>
        <CurrencyCardGrid currencies={popularCurrencies} />
      </div>
    </>
  );
};

export default HomePage;
