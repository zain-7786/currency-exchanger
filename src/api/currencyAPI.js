import axios from 'axios';

const API_KEY = '4c6c55c447aff4cce4008ea6b2313f84' // Replace with your Fixer API key

const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export default {
  fetchExchangeRates,
};
