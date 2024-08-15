javascript
async function search() {
  try {
    const city = document.getElementById("inp").value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d82dce617113dc86ab2408e76df76adb`;
    const response = await fetch(apiUrl);
    if (response.status === 404) {
      document.getElementById("weth").innerHTML = `<p>City not found</p>`;
    } else if (response.ok) {
      const weatherData = await response.json();
      const weatherHtml = `
        <div class="weather">
          <h1>${weatherData.name}</h1>
          <div class="m1">
            <h1>${(weatherData.main.temp - 273.15).toFixed(2)}°C</h1>
            <div class="m2">
              <h3>°C</h3>
              <img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="icon">
            </div>
          </div>
          <p><b>Weather details</b></p>
          <table>
            <tr>
              <td>
                <p>Feels like</p>
                <h3>${(weatherData.main.feels_like - 273.15).toFixed(2)}°C</h3>
              </td>
              <td>
                <p>Condition</p>
                <h3>${weatherData.weather[0].main}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <p>Wind</p>
                <h3>${weatherData.wind.speed} km/h</h3>
              </td>
              <td>
                <p>Humidity</p>
                <h3>${weatherData.main.humidity}%</h3>
              </td>
            </tr>
            <tr>
              <td>
                <p>Visibility</p>
                <h3>${weatherData.visibility / 1000} km</h3>
              </td>
              <td>
                <p>Air pressure</p>
                <h3>${weatherData.main.pressure} hPa</h3>
              </td>
            </tr>
          </table>
        </div>
      `;
      document.getElementById("weth").innerHTML = weatherHtml;
    } else {
      document.getElementById("weth").innerHTML = `<p>Error: ${response.status} ${response.statusText}</p>`;
    }
  } catch (error) {
    console.error(error);
    document.getElementById("weth").innerHTML = `<p>Error: Unable to fetch weather data</p>`;
  }
}