console.log("hello")

const search_input = document.querySelector("#search-input");
const search_btn = document.querySelector("#search-btn");
const temperature = document.querySelector("#temperature");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const lastUpdated = document.querySelectorAll("#lastUpdated");

const error = document.getElementById("404-error");
error.style.display = "none";

const feature_card = document.getElementById("feature-cards");

// calling api
async function getweather(city) {
    const api_key = "01d2ceb362653803d8d76647fceff6b8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(Response => Response.json());

    //showing error

    if (weather_data.cod == 404) {
        error.style.display = "flex";
        feature_card.style.display = "none";
        console.log("location not found !");
        return;
    }

    console.log(weather_data);

    temperature.innerHTML = Math.round(weather_data.main.temp - 273.15);
    wind.innerHTML = weather_data.wind.speed;
    humidity.innerHTML = weather_data.main.humidity;

    //last updated

    const time = new Date(weather_data.dt * 1000);
    lastUpdated.forEach((el) => {
        el.innerHTML = time.toLocaleString();
    });

    // lastUpdated.innerHTML = time.toLocaleString();
}

getweather("jaipur");

search_btn.addEventListener('click', () => {
    getweather(search_input.value);
});
// 404 error