async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiKey = "f80dbe0c684d0ce139600413e513af9a"; // Make sure this is your valid API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  // Show loading state
  document.getElementById("cityName").textContent = "Loading...";
  document.getElementById("temperature").textContent = "";
  document.getElementById("humidity").textContent = "";
  document.getElementById("windSpeed").textContent = "";
  document.getElementById("weatherIcon").src = "";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Handles 401 or other HTTP errors
      if (response.status === 401) {
        alert("Invalid API key. Please check your API key.");
      } else if (response.status === 404) {
        alert("City not found. Please try again.");
      } else {
        alert(`Error: ${response.status} ${response.statusText}`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Update the UI with weather data
    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;

    // Convert m/s to km/h
    const windKmh = (data.wind.speed * 3.6).toFixed(1);
    document.getElementById("windSpeed").textContent = `${windKmh} km/h`;

    // Update weather icon
    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weatherIcon").alt = data.weather[0].description;

  } catch (error) {
    console.error("Fetch error:", error);

    // Show fallback UI on error
    document.getElementById("cityName").textContent = "Error";
    document.getElementById("temperature").textContent = "--";
    document.getElementById("humidity").textContent = "--";
    document.getElementById("windSpeed").textContent = "--";
    document.getElementById("weatherIcon").src = "cloudy.png";  // Make sure this file exists or replace it with valid URL
    document.getElementById("weatherIcon").alt = "Error";
  }
}
