// import countriesHBS from '../partials/countries.hbs';
// import countryHBS from '../partials/country.hbs';
import imageCardHBS from '../partials/imageCard.hbs';
import { refs } from './refs';

function redrawInterface(images) {
  if (!images) {
    // refs.countryInfo.innerHTML = '';
    // refs.countryList.innerHTML = '';
    refs.gallery.innerHTML = '';

    return;
  }

  // if (images.length > 1) {
  //   refs.countryInfo.innerHTML = '';
  //   refs.countryList.innerHTML = countriesHBS(images);
  //   return;
  // }

  if (images) {
    // refs.countryInfo.innerHTML = countryHBS(images);
    // refs.countryList.innerHTML = '';
    refs.gallery.innerHTML += images.map(image => imageCardHBS(image));
    return;
  }
}

export { redrawInterface };
