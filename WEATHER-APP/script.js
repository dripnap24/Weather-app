const apiKey = "cf3fb59a568277f5d3b9c8bfaf8a4c74";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    });
  }
}

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  displayWeather(data);
}

async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  displayWeather(data);
}

function displayWeather(data) {
  const weather = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
    <p>🌅 Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
    <p>🌇 Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    <p>📌 Condition: ${data.weather[0].main}</p>
    <a href="https://www.google.com/maps?q=${data.coord.lat},${data.coord.lon}" target="_blank">📍 View on Map</a>
  `;
  document.getElementById("weatherDisplay").innerHTML = weather;

  // Call OpenAI suggestions
  generateAISuggestions(data);
}


