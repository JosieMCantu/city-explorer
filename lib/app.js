const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const request = require('superagent');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const { getLocation, getWeather, getReviews } = require('./utils.js');

app.get('/location', async (req, res) => {
  try {
    const cityName = req.query.search;
    const locationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.Location_Key}&q=${cityName}&format=json`);
    const formattedData = getLocation(locationData.body);

    res.json(formattedData);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.Weather_Key}`);

    const formattedWeather = getWeather(weatherData.body);

    res.json(formattedWeather);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/reviews', async (req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;

    const weatherReturn = await request
      .get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`)
      .set('Authorization', `Bearer ${process.env.Yelp_Key}`)
      .set('Accept', 'application/json');

    const returnWeather = getReviews(weatherReturn.body);

    res.json(returnWeather);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});


app.use(require('./middleware/error'));

module.exports = app;
