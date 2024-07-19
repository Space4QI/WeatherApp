import axios from 'axios';

export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

export const fetchWeatherRequest = () => {
  return {
    type: FETCH_WEATHER_REQUEST
  };
};

export const fetchWeatherSuccess = weather => {
  return {
    type: FETCH_WEATHER_SUCCESS,
    payload: weather
  };
};

export const fetchWeatherFailure = error => {
  return {
    type: FETCH_WEATHER_FAILURE,
    payload: error
  };
};

export const fetchWeather = city => {
  return dispatch => {
    dispatch(fetchWeatherRequest());
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c9e57fbf0b0c794a7215b1eaa46662ff`
      )
      .then(response => {
        const weather = response.data;
        dispatch(fetchWeatherSuccess(weather));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchWeatherFailure(errorMsg));
      });
  };
};
