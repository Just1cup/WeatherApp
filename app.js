const apiKey = window.api_KEY;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weatherIcon = document.querySelector(".weather-icon");
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

function setWeatherIcon(icon) {
  const iconMapping = {
    "Clouds": 'assets/Cloud.png',
    "Clear": 'assets/Clear.png',
    "Mist": 'assets/mist.png',
    "Drizzle": 'assets/Drizzle.png',
    "Rain": 'assets/Raub.png'
  };
  weatherIcon.src = iconMapping[icon] || '';
}

async function fetchWeatherData(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

function updateWeatherUI(data) {
  if (!data) return;

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°c`;
  document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

  setWeatherIcon(data.weather[0].main);
}

function checkWeather(city) {
  fetchWeatherData(city)
    .then(data => updateWeatherUI(data))
    .catch(error => console.error('Error fetching weather:', error));
}

searchBox.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    checkWeather(searchBox.value);
  }
});

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});