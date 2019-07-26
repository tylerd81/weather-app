const degreeSign = "&#176;";
const tempUnit = "F";
const apiKey = "a810861bf076b52f064ad589d2a225d8";

const setCurrentTemperature = async zip => {
  const currTemp = document.getElementById("current-temp");
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=a810861bf076b52f064ad589d2a225d8`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    const temp = Math.floor(data.main.temp);
    const desc = data.weather[0].description;
    const city = data.name;

    currTemp.innerHTML = `${temp}${degreeSign}${tempUnit}`;
    setWeatherDescription(desc);
    setCity(city);
  }
};

const setWeatherDescription = desc => {
  const wd = document.getElementById("weather-description");
  wd.innerHTML = desc;
};

const setCity = cityName => {
  const city = document.getElementById("city-name");
  city.innerHTML = cityName;
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

const getWeatherData = async zip => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&cnt=35&units=imperial&appid=${apiKey}`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    const { list } = data;

    //loop through the list of data and get at least 4 different dates
    let prevDate;
    const forecast = list.reduce((items, item) => {
      let date;

      if (typeof prevDate === "undefined") {
        //first data
        prevDate = item.dt_txt.substring(8, 10);
        items.push(item);
      } else {
        date = item.dt_txt.substring(8, 10);
        if (date !== prevDate) {
          prevDate = date;
          items.push(item);
        }
      }
      return items;
    }, []);

    return forecast;
  } else {
    return { msg: "Server Error" };
  }
};

const zip = 12303;
setCurrentTemperature(zip);

(async () => {
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
})();
