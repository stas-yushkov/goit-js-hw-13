import countriesHBS from '../partials/countries.hbs';
import countryHBS from '../partials/country.hbs';

const refs = {
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function redrawInterface(data) {
  if (!data) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  if (data.length > 1) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = countriesHBS(data);
    return;
  }

  if (data) {
    refs.countryInfo.innerHTML = countryHBS(data);
    refs.countryList.innerHTML = '';
    return;
  }
}

export { redrawInterface };
