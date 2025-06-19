const api_key = "c27a988e09e2b73e21f5807892dde46c";

document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        document.getElementById('weatherResult').innerHTML = "Please enter a city name.";
        return;
    }
    document.getElementById('weatherResult').innerHTML = "Loading...";
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${api_key}&units=metric`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();

        // Extract weather info
        const weatherHtml = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}">
            <p><strong>${data.weather[0].main}:</strong> ${data.weather[0].description}</p>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Feels like:</strong> ${data.main.feels_like}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weatherResult').innerHTML = weatherHtml;
    } catch (err) {
        document.getElementById('weatherResult').innerHTML = "Error: " + err.message;
    }
});