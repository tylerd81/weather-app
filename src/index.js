import "./css/style.css";

// import Run from "./weather";
// Run();
import { getFiveDayForecast, getCurrentForecast } from "./api";

getFiveDayForecast(12303).then(forecast => console.log(forecast));
getCurrentForecast(12303).then(forecast => console.log(forecast));
