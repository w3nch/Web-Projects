const city = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");



async function checkWeather(cityName = "Delhi") {
    const apiUrl = `https://wttr.in/${encodeURIComponent(cityName)}?format=j1`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();

        const areaName = data.nearest_area[0].areaName[0].value;
        const tempC = data.current_condition[0].temp_C;
        const humidityVal = data.current_condition[0].humidity;
        const windSpeed = data.current_condition[0].windspeedKmph;

        city.innerText = areaName;
        temperature.innerText = `${tempC}°C`;
        humidity.innerHTML = `<i class="fa-solid fa-water"></i> Humidity: ${humidityVal}%`;
        wind.innerHTML = `<i class="fa-solid fa-wind"></i> Wind: ${windSpeed} km/h`;

    } catch (err) {
        console.error("Error:", err);
        city.innerText = "Error";
        temperature.innerText = "--";
        humidity.innerText = "Humidity: --";
        wind.innerText = "Wind: --";
    }
}

// Call on load
checkWeather();

// Handle button click
searchButton.addEventListener("click", () => {
    const cityName = searchInput.value.trim();
    if (cityName) {
        checkWeather(cityName);
    } else {
        alert("Please enter a city name");
    }
});

// Handle Enter key
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchButton.click(); // simulate button click
    }
});
