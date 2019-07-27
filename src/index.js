import "./css/style.css";

// import Run from "./weather";
// Run();
import { getFiveDayForecast, getCurrentForecast } from "./api";
import { displayCurrentForecast, addWeatherCard } from "./weather";

getFiveDayForecast(12303)
  .then(forecast => {
    // console.log(forecast);

    for (const forecastDate in forecast) {
      console.log(forecastDate);
      const data = forecast[forecastDate][0];

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
    }
  })
  .catch(err => console.log(err.message));

getCurrentForecast(12303)
  .then(forecast => displayCurrentForecast(forecast))
  .catch(err => console.log(err.message));
