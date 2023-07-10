import React from 'react';
import './CurrencyCard.css'

const CurrencyCard = ({ currency, exchangeRate }) => {
  return (
    <div className="currency-card">
      <h3 className="currency-card__title">{currency}</h3>
      <p className="currency-card__rate">{exchangeRate}</p>
    </div>
  );
};

export default CurrencyCard;
