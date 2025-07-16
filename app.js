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

    res.render('index', { rates, base });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.send('Error fetching exchange rates.');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
