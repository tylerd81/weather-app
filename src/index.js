import "./css/style.css";

import { getFiveDayForecast, getCurrentForecast } from "./api";
import { displayCurrentForecast, displayFiveDayForecast } from "./weather";
import { initZipCodeDialog } from "./dialog";

const defaultZipCode = 12205;

const updateFiveDayForecast = async zipCode => {
  try {
    const forecast = await getFiveDayForecast(zipCode);
    displayFiveDayForecast(forecast);
  } catch (err) {
    console.log(err.message);
  }
};

const updateCurrentForecast = async zipCode => {
  try {
    const forecast = await getCurrentForecast(zipCode);
    displayCurrentForecast(forecast);
  } catch (err) {
    console.log(err.message);
  }
};

const reloadWeather = () => {
  getWeather(window.localStorage.getItem("zipCode") || defaultZipCode);
};

const getWeather = zip => {
  updateCurrentForecast(zip);
  updateFiveDayForecast(zip);
};

initZipCodeDialog(reloadWeather);
getWeather(window.localStorage.getItem("zipCode") || defaultZipCode);
