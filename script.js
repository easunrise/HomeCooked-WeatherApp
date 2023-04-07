'use strict';
//? DOM OBJECTS
const countryName = document.querySelector('.country-name');

//? RESTFUL API
const API_URL_REST_COUNTRIES = `https://restcountries.com/v3.1/name/`;

//?API INFORMATION OPEN WEATHER
const API_URL_OPEN_WEATHER = `https://api.open-meteo.com/v1/forecast?latitude=&longitude=13.41&hourly=temperature_2m`;

console.log(API_URL_OPEN_WEATHER);

//? FETCHING DATA OPEN WEATHER
const fetchWeatherData = async function (lat, lng) {
  const openWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m`;
  const response = await fetch(openWeatherUrl);
  const data = await response.json();

  console.log(data);
};

//?FETCHING COUNTRY INFO WITH REST API
let countryObject;
const getCountryInfo = async function (country) {
  try {
    //creating the right url
    const countryUrl = `${API_URL_REST_COUNTRIES}${country}`;
    //fetching country info
    const response = await fetch(countryUrl);

    let countryObject;

    const data = await response.json().then(res => {
      [res] = res;

      countryObject = {
        country: res.name.common,
        latCoords: res.latlng[0],
        lngCoords: res.latlng[1],
        continent: res.continents[0],
      };
    });

    //creating a country object}
  } catch (err) {
    //
    console.log(err);
  }
};

// getCountryInfo('tanzania');
//? COUNTRY NAME TEST
countryName.addEventListener('click', function (e) {
  fetchWeatherData(countryObject.latCoords, countryObject.lngCoords);
});

//? Country Class
class CountryWeatherCl {
  constructor(country) {
    this.country = this.createCountry('tanzania');
    // this.temperature = this.fetchWeather(API_URL_OPEN_WEATHER);
  }

  async createCountry(country) {
    await getCountryInfo(country);
  }
}

const tanzaniaWeather = new CountryWeatherCl('Tanzania');
console.log(tanzaniaWeather);
