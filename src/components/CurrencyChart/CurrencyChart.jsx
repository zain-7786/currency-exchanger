import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';

const API_KEY = '4c6c55c447aff4cce4008ea6b2313f84'

const CurrencyChart = ({ fromCurrency, toCurrency }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(
          `http://data.fixer.io/api/timeseries?access_key=${API_KEY}&start_date=${getStartDate()}&end_date=${getEndDate()}&base=${fromCurrency}&symbols=${toCurrency}`
        );
        const { rates } = response.data;
        const chartData = formatChartData(rates);

        // Destroy previous chart instance if it exists
        if (chartInstance) {
          chartInstance.destroy();
        }

        const ctx = chartRef.current.getContext('2d');

        // Create new chart instance
        chartInstance = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Months',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Rates',
                },
              },
            },
          },
        });
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();

    // Cleanup chart instance on component unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [fromCurrency, toCurrency]);

  const getStartDate = () => {
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return formatDate(oneYearAgo);
  };

  const getEndDate = () => {
    const currentDate = new Date();

    return formatDate(currentDate);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatChartData = (rates) => {
    const labels = [];
    const data = [];

    for (const date in rates) {
      if (Object.hasOwnProperty.call(rates, date)) {
        const formattedDate = new Date(date).toLocaleString('en-us', {
          month: 'short',
        });
        labels.push(formattedDate);
        data.push(rates[date][toCurrency]);
      }
    }

    return {
      labels,
      datasets: [
        {
          label: `${fromCurrency} to ${toCurrency}`,
          data,
          fill: false,
          borderColor: '#007bff',
          tension: 0.4,
        },
      ],
    };
  };

  return <canvas ref={chartRef} />;
};

export default CurrencyChart;
