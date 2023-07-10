import React from 'react';

const CurrencyDisplay = ({ convertedValue }) => {
  return (
    <div>
      <h2>Converted Value:</h2>
      <p>{convertedValue}</p>
    </div>
  );
};

export default CurrencyDisplay;
