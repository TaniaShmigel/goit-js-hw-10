import './css/styles.css';
import FetchCountrise from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  coutryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const fetchCountries = new FetchCountrise();

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const country = e.target.value.trim();

  if (country === '') {
    clearCountryList();
    return (refs.countryInfo.innerHTML = '');
  }

  fetchCountries.name = country;
  fetchCountries.fetch().then(data => {
    arrayCheckLength(data);
    console.log(data)
    return data;
  });

  
}

function arrayCheckLength(array) {
  if (array.length >= 1 && array.length > 10) {
    clearCountryList();
    clearCountryInfo();
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (array.status === 404) {
    clearCountryList();
    clearCountryInfo();
    return Notify.failure('Oops, there is no country with that name');
  }
  if (array.length === 1) {
    clearCountryList();
    clearCountryInfo();
    return createCard(array);
  }
  clearCountryList();
  clearCountryInfo();
  return createList(array);
}

function createCard(array) {
  const markupCard = array
    .map(
      ({
        flags: { svg: flags },
        name: { official, common },
        capital,
        population,
        languages,
      }) =>
        `<div class="container"><h2 class="country">
     <img class="flag" src="${flags}" alt="flag"> 
        ${official}</h2>
    <p class="title"><span class="span">Capital: </span>${capital}</p>
    <p class="title"><span class="span">Population: </span>${population}</p>
 <p class="title"><span class="span">Languages: </span>${Object.values(
   languages
 )}</p></div>`
    )
    .join('');
  refs.coutryList.insertAdjacentHTML('beforeend', markupCard);
}

function createList(array) {
  const markupList = array
    .map(
      ({
        flags: { svg: flags },
        name: { official, common },
      }) => `<li class="item">
         <img class="icon" src="${flags}" alt="flag">
         <p class="text">${common}</p>
     </li>  `
    )
    .join('');
  refs.coutryList.insertAdjacentHTML('beforeend', markupList);
}

function clearCountryList() {
  return (refs.coutryList.innerHTML = '');
}

function clearCountryInfo() {
  return (refs.countryInfo.innerHTML = '');
}
