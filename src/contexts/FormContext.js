import React, { createContext, useState } from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    fromCurrency: '',
    toCurrency: '',
    amount: '',
  });

  const updateFormValues = (values) => {
    setFormValues({ ...formValues, ...values });
  };

  return (
    <FormContext.Provider value={{ formValues, updateFormValues }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
