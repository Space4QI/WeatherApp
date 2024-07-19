import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from './actions/weatherActions';

const Weather = () => {
  const [city, setCity] = useState('');
  const weather = useSelector(state => state.weather);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(fetchWeather(city));
    setCity('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather.loading ? (
        <p>Loading...</p>
      ) : weather.error ? (
        <p>{weather.error}</p>
      ) : (
        <div>
          {weather.data && (
            <div>
              <h2>{weather.data.name}</h2>
              <p>{weather.data.weather[0].description}</p>
              <p>Temperature: {weather.data.main.temp}°C</p>
              <p>Humidity: {weather.data.main.humidity}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
