import { getWeatherData } from "./api";

const degreeSign = "&#176;";
const tempUnit = "F";
const apiKey = "a810861bf076b52f064ad589d2a225d8";

export const displayCurrentForecast = forecast => {
  const cityName = document.querySelector("#city-name");
  const currentTemp = document.querySelector("#current-temp");
  const description = document.querySelector("#weather-description");

  cityName.innerText = forecast.city;
  currentTemp.innerHTML = `${Math.floor(
    forecast.temp
  )}${degreeSign}${tempUnit}`;
  description.innerText = forecast.description;
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

const Run = async () => {
  const forecast = await getWeatherData(zip);

  if (!Array.isArray(forecast)) {
    console.log("Error getting weather data");
    return;
  }

  forecast.forEach(data => {
    const weatherIcon = data.weather[0].icon;
    const temp = Math.floor(data.main.temp);
    const dateString = data.dt_txt.substring(0, 10);

    const year = dateString.substring(0, 4);
    let month = (Number.parseInt(dateString.substring(5, 7)) - 1).toString();
    if (month < 0) {
      month = 12;
    }

    const date = dateString.substring(8, 10);
    const forecastDay = new Date(year, month, date)
      .toDateString()
      .substring(0, 3);

    const weatherData = {
      weatherIcon,
      temp,
      day: forecastDay
    };
    addWeatherCard(weatherData);
  });
};

export default Run;
