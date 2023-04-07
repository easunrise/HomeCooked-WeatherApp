'use strict';
// ? DOM OBJECTS
const countryContainer = document.querySelector('.weather-display');
const countryTitle = document.querySelector('.country-name');
const flagContainer = document.querySelector('.cover-image');

const tempContainer = document.getElementById('temp');
const feelsLikeContainer = document.getElementById('apparent');
const rainChanceContainer = document.getElementById('percent');
const humidityContainer = document.getElementById('humidity');

const searchBox = document.getElementById('search');

const buttonContainer = document.querySelector('.button');

//? RESTFUL API
const API_URL_REST_COUNTRIES = `https://restcountries.com/v3.1/name/`;

//?API INFORMATION OPEN WEATHER
const API_URL_OPEN_WEATHER = `https://api.open-meteo.com/v1/forecast?latitude=&longitude=13.41&hourly=temperature_2m`;

//? Country Class

class CountryCl {
  constructor(country) {
    this.fetchCountry(country).then(res => {
      this.fetchWeather(res.lat, res.lng).then(res => {
        this.displayWeather(res);
      });
      this.setCountryTitle(res);
    });
  }

  async fetchCountry(country) {
    const countryUrl = `${API_URL_REST_COUNTRIES}${country}`;

    //? API CALL
    try {
      const response = await fetch(countryUrl);
      const [data] = await response.json();

      console.log(data);
      return (this.countryData = {
        country: data.name.common,
        continent: data.continents[0],
        lat: data.latlng[0],
        lng: data.latlng[1],
        flagUrl: data.flags.png,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async fetchWeather(lat, lng) {
    const WEATHER_API = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability`;

    const response = await fetch(WEATHER_API);
    const data = await response.json();

    console.log(`Data`, data);
    return (this.weatherData = {
      apparentTemp: data.hourly.apparent_temperature.slice(0, 5),
      precipitationProb: data.hourly.precipitation_probability.slice(0, 5),
      relativeHumidity: data.hourly.relativehumidity_2m.slice(0, 5),
      temperature: data.hourly.temperature_2m.slice(0, 5),
    });
  }

  setCountryTitle(countryObj) {
    console.log(countryObj);
    countryTitle.textContent = countryObj.country;
    flagContainer.src = countryObj.flagUrl;
  }

  displayWeather(weatherObj) {
    console.log(weatherObj);
    tempContainer.textContent = weatherObj.temperature[0];
    feelsLikeContainer.textContent = weatherObj.apparentTemp[0];
    rainChanceContainer.textContent = weatherObj.precipitationProb[0];
    humidityContainer.textContent = weatherObj.relativeHumidity[0];
  }
}

// const createCountry = async function () {
// const tanzania = new CountryCl('France');
//   console.log(tanzania);
// };

// createCountry();
// ? Toggle Displays
const toggleDisplay = function () {
  countryContainer.classList.toggle('hidden');
  searchBox.classList.toggle('hidden');
  searchBox.value = '';
};

//? EVENT LISTENERS

//? SEARCH FUNCTIONALITY
searchBox.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const query = searchBox.value;
    const country = new CountryCl(query);

    toggleDisplay();
  }
});

buttonContainer.addEventListener('click', function (e) {
  toggleDisplay();
});

console.log('UPDATED');
