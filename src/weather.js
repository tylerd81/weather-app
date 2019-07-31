const degreeSign = "&#176;";
const tempUnit = "F";

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

const addWeatherCard = weatherData => {
  const forecastList = document.getElementById("forecast");
  const li = document.createElement("li");
  const card = createWeatherCard(weatherData);
  li.appendChild(card);
  forecastList.appendChild(li);
};

const timestampToString = timestamp => {
  const d = new Date(timestamp * 1000);
  console.log(timestamp);
  return d.toTimeString();
};

export const displayFiveDayForecast = forecast => {
  document.querySelector("ul#forecast").innerHTML = "";

  forecast.forEach(forecastData => {
    const forecastIndex = forecastData.length < 8 ? 0 : forecastData.length - 2;
    // const data = forecastData[forecastData.length - 2] || forecastData[0];
    const data = forecastData[forecastIndex];
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
