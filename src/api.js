const apiKey = "a810861bf076b52f064ad589d2a225d8";
const numForecast = 40;

export const getCurrentForecast = async zip => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=a810861bf076b52f064ad589d2a225d8`;

  const response = await fetch(apiUrl);

  if (response.ok) {
    const weatherData = await response.json();
    const forecastData = {
      current_temp: weatherData.main.temp,
      temp_min: weatherData.main.temp_min,
      temp_max: weatherData.main.temp_max,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      city: weatherData.name
    };
    return forecastData;
  } else {
    return {
      msg: "API Error",
      forecast: null
    };
  }
};

// getFiveDayForecast returns an object with an array of objects which
// have the date for the property name. Each array contains the
// weather data provided by the openweatherapi.
export const getFiveDayForecast = async zip => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&cnt=${numForecast}&units=imperial&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  const forecastData = {};

  if (response.ok) {
    const data = await response.json();
    const weatherData = data.list;

    forecastData.city = data.city.name;
    forecastData.msg = "Ok";

    // loop through the list and create an object with properties set
    // to the dates

    // openweather returns an array of data, one item for every 3 hours, in the list
    // property of the json object that is returned.

    weatherData.forEach(data => {
      // get the date
      // the string returned is in the format YYYY-MM-DD HH:MM:SS"

      let date = data.dt_txt.substring(0, 10);
      let time = data.dt_txt.substring(11, 16);

      if (typeof forecastData[date] === "undefined") {
        forecastData[date] = []; // create a new array for the new date
      }

      let currentForecast = {
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        time
      };
      forecastData[date].push(currentForecast);
    });
  } else {
    return {
      msg: "ServerError",
      forecast: null
    };
  }

  return forecastData;
};
