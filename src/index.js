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
    const numberOfCountries = countries.length;
    console.log('countries', countries);

    const countriesObject = countries.map((country) => ({
        name: country.name.official,
        capital: country.capital,
        population: country.population,
        languages: Object.values(country.languages)[0],
        flag: country.flags.png,
    }));
    console.log('countriesObject', countriesObject);

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