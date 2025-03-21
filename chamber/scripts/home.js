// OpenWeatherMap API Key and URL
const apiKey = "37fa64c69fdde29a8a940cd434471c45";
const city = "Taguig";
const units = "metric";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

// DOM Elements
const tempElement = document.getElementById("temp");
const conditionElement = document.getElementById("condition");
const highElement = document.getElementById("high");
const lowElement = document.getElementById("low");
const humidityElement = document.getElementById("humidity");
const sunriseElement = document.getElementById("sunrise");
const sunsetElement = document.getElementById("sunset");
const weatherIconElement = document.querySelector(".weather_icon img");

// DOM Elements for Forecast
const todayForecastElement = document.getElementById("tod-forecast");
const day2ForecastElement = document.getElementById("day2-forecast");
const day3ForecastElement = document.getElementById("day3-forecast");

// Fetch Weather Data
async function fetchWeather() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    console.log(data); // Debug the API response
    updateWeatherUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Fetch Forecast Data
async function fetchForecast() {
  try {
    const response = await fetch(forecastApiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    const data = await response.json();
    updateForecastUI(data);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

// Update the Weather Information in the UI
function updateWeatherUI(data) {
  const { temp } = data.main;
  const { description, icon } = data.weather[0];
  const { temp_max, temp_min, humidity } = data.main;
  const { sunrise, sunset } = data.sys;

  // Update DOM Elements
  tempElement.textContent = Math.round(temp);
  conditionElement.textContent =
    description.charAt(0).toUpperCase() + description.slice(1);
  highElement.textContent = Math.round(temp_max);
  lowElement.textContent = Math.round(temp_min);
  humidityElement.textContent = humidity;

  // Convert sunrise and sunset timestamps to readable time
  sunriseElement.textContent = new Date(sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  sunsetElement.textContent = new Date(sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Update Weather Icon
  const weatherIconElement = document.getElementById("weather-icon");
  weatherIconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIconElement.alt = description;
}

// Update the Forecast Information in the UI
function updateForecastUI(data) {
  const forecastList = data.list;

  // Extract daily temperatures (use the first forecast for each day)
  const today = new Date().getDate();
  const dailyForecasts = forecastList.filter((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000).getDate();
    return forecastDate !== today; // Exclude today's data
  });

  // Get the next 3 days' forecasts
  const day1 = dailyForecasts[0];
  const day2 = dailyForecasts[8]; // Approx. 24 hours later
  const day3 = dailyForecasts[16]; // Approx. 48 hours later

  // Update the UI with temperatures
  todayForecastElement.textContent = Math.round(day1.main.temp);
  day2ForecastElement.textContent = Math.round(day2.main.temp);
  day3ForecastElement.textContent = Math.round(day3.main.temp);

  // Dynamically label the days
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day1Name = dayNames[new Date(day1.dt * 1000).getDay()];
  const day2Name = dayNames[new Date(day2.dt * 1000).getDay()];
  const day3Name = dayNames[new Date(day3.dt * 1000).getDay()];

  // Update the labels in the HTML
  document.getElementById("day1-label").textContent = day1Name;
  document.getElementById("day2-label").textContent = day2Name;
  document.getElementById("day3-label").textContent = day3Name;
}

// Call the Fetch Functions
fetchWeather();
fetchForecast();
