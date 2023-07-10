import React from 'react';
import './CurrencyCardGrid.css'
import CurrencyCard from '../CurrencyCard/CurrencyCard';

const CurrencyCardGrid = ({ currencies }) => {
  return (
    <div className="currency-card-grid">
      {currencies.map((currency) => (
        <CurrencyCard
          key={currency.currency}
          currency={currency.currency}
          exchangeRate={currency.exchangeRate}
        />
      ))}
    </div>
  );
};

export default CurrencyCardGrid;
