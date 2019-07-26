const apiKey = "a810861bf076b52f064ad589d2a225d8";

export const getWeatherData = async zip => {
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
