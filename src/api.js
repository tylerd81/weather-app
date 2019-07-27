const apiKey = "a810861bf076b52f064ad589d2a225d8";
const numForecast = 40;

// createForecastObject() takes the json data returned from the api and
// turns it into a simpler object.

const createForecastObject = jsonData => {
  let currentForecast = {
    temp: jsonData.main.temp,
    temp_min: jsonData.main.temp_min,
    temp_max: jsonData.main.temp_max,
    // humidity: data.main.humidity,
    city: jsonData.name || "Not Set",
    description: jsonData.weather[0].description,
    icon: jsonData.weather[0].icon,
    time: jsonData.dt
  };
  return currentForecast;
};

// getCurrentForecast() gets the current forecast for the provided zipcode.
export const getCurrentForecast = async zip => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (response.ok && response.status === 200) {
    const weatherData = await response.json();
    const forecastData = createForecastObject(weatherData);
    return forecastData;
  } else {
    throw new Error("Failed to get current forecast data");
  }
};

// getFiveDayForecast returns an object with an associative array that
// has the date of the forecast as the array key. Each array contains the
// weather data provided by the openweatherapi.
export const getFiveDayForecast = async zip => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&cnt=${numForecast}&units=imperial&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  const forecastList = []; // array that will contai array of arrays - a new
  // array for each day.

  if (response.ok && response.status === 200) {
    const data = await response.json();
    const weatherData = data.list;

    let prevDate = weatherData[0].dt_txt.substring(0, 10); //first date
    let forecastData = []; // temp array for saving the data for the same days

    // create an array of arrays - each day is a new array
    // each entry for the same day is in the same array.

    weatherData.forEach(data => {
      let date = data.dt_txt.substring(0, 10);
      if (date === prevDate) {
        // save to the temp array
        forecastData.push(createForecastObject(data));
      } else {
        // next day
        prevDate = date;
        forecastList.push(forecastData); // save to the main forecast list

        forecastData = []; // reset the temp array
        forecastData.push(createForecastObject(data)); // save the current data
      }
    });
  } else {
    throw new Error("Failed to load forecast data from the api.");
  }
  return forecastList;
};
