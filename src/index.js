import "./css/style.css";

import { getFiveDayForecast, getCurrentForecast } from "./api";
import {
  displayCurrentForecast,
  displayFiveDayForecast,
  addWeatherCard
} from "./weather";

getFiveDayForecast(12303)
  .then(forecast => {
    displayFiveDayForecast(forecast);
  })
  .catch(err => console.log(err.message));

getCurrentForecast(12303)
  .then(forecast => displayCurrentForecast(forecast))
  .catch(err => console.log(err.message));
