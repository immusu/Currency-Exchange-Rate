const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const API_URL = 'https://v6.exchangerate-api.com/v6/48c6542721f721c26ea0d88d/latest/USD';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const rates = response.data.conversion_rates;
    const base = response.data.base_code;

    res.render('index', {
      rates,
      base,
      amount: '',
      from: '',
      to: '',
      result: null,
    });
  } catch (error) {
    console.error(error);
    res.send('Error fetching exchange rates.');
  }
});


app.get('/convert', async (req, res) => {
  try {
    const { amount, from, to } = req.query;
    const response = await axios.get(API_URL);
    const rates = response.data.conversion_rates;

    // Convert input amount
    const amountInBase = amount / rates[from];     // Convert to USD
    const convertedAmount = amountInBase * rates[to]; // Convert to target

    res.render('index', {
      rates,
      base: response.data.base_code,
      amount,
      from,
      to,
      result: convertedAmount.toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.send('Error during conversion.');
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
