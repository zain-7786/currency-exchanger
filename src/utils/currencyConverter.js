const convertCurrency = (amount, sourceCurrency, targetCurrency, rates) => {
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];
    const convertedValue = (amount / sourceRate) * targetRate;
    return convertedValue.toFixed(2);
  };
  
  export default convertCurrency;
  