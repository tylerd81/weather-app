import { getWeatherData } from "./api";

const degreeSign = "&#176;";
const tempUnit = "F";
const apiKey = "a810861bf076b52f064ad589d2a225d8";

export const displayCurrentForecast = forecast => {
  const cityName = document.querySelector("#city-name");
  const currentTemp = document.querySelector("#current-temp");
  const description = document.querySelector("#weather-description");

  cityName.innerHTML = forecast.city;
  currentTemp.innerHTML = `${Math.floor(
    forecast.temp
  )}${degreeSign}${tempUnit}`;
  description.innerHTML = forecast.description;
};

const createWeatherCard = weatherData => {
  const { weatherIcon, temp, day } = weatherData;
  const card = document.createElement("div");
  card.classList.add("weather-card");
  const img = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

  card.innerHTML = `
    <span class="day">${day}</span>
    <img class="weather-icon" src="${img}" alt="weather icon">
    <span class="temperature">${temp}${degreeSign}${tempUnit}</span>
  `;
  return card;
};

export const addWeatherCard = weatherData => {
  const forecastList = document.getElementById("forecast");
  const li = document.createElement("li");
  const card = createWeatherCard(weatherData);
  li.appendChild(card);
  forecastList.appendChild(li);
};

export const displayFiveDayForecast = forecast => {
  document.querySelector("ul#forecast").innerHTML = "";

  forecast.forEach(forecastData => {
    const data = forecastData[6] || forecastData[0];
    console.log(data);
    // forecast.forEach(data => {
    const weatherIcon = data.icon;
    const temp = Math.floor(data.temp);

    //convert the timestamp into a string
    const date = new Date(data.time * 1000);
    const day = date.toDateString().substring(0, 3);

    const weatherData = {
      weatherIcon,
      temp,
      day
    };

    addWeatherCard(weatherData);
  });
};
