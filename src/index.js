import "./sass/index.scss";
import getRefs from './js/get-refs';
import API from './js/fetch-countries';
import countryCardTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/countries-list.hbs';
const debounce = require('lodash.debounce');
import pnotify from './js/pnotife-results';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearchInput, 500));

function onSearchInput() {
    clearCountriesContainer();
    const searchQuery = refs.searchInput.value;

    API.fetchCountries(searchQuery)
        .then(searchResult)
        .catch(console.log);
}

function searchResult(countries) {
    if (countries.status ===  404) {
        clearCountriesContainer();
        pnotify.Error();
    }
  
    const numberOfCountries = countries.length;

    const countriesObject = countries.map((country) => ({
        name: country.name.official,
        capital: country.capital,
        population: country.population,
        languages: Object.values(country.languages)[0],
        flag: country.flags.png,
        googleMap: country.maps.googleMaps,
        coatOfArms: country.coatOfArms.png,
        currency: Object.values(country.currencies)[0].name,
    }));

    if (numberOfCountries === 1) {
        renderResultMarkup(countriesObject, countryCardTpl);
    } else if (numberOfCountries >= 2 && numberOfCountries <= 10) {
        renderResultMarkup(countriesObject, countriesListTpl);
    } else if (numberOfCountries > 10) {
        clearCountriesContainer();
        pnotify.Info();
    } else {
        clearCountriesContainer();
        pnotify.Error();
    }
}

function renderResultMarkup(countries, templateHbs) {
    const markup = templateHbs(countries);
    refs.countryContainer.innerHTML = markup;
}

function clearCountriesContainer() {
    refs.countryContainer.innerHTML = '';
}
