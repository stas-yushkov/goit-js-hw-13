import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import { fetchCountries } from './js/fetchCountries';
import { redrawInterface } from './js/redrawInterface';

const inputRef = document.querySelector('input#search-box');

const DEBOUNCE_DELAY = 300;
const MAX_LENGTH = 10;

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// onInput();

function onInput(e) {
  const searchQuery = e.target.value.trim();
  // const searchQuery = 'sw';

  if (searchQuery === '') {
    Notify.failure('Search query must not be empty or just spaces');
    redrawInterface();
    console.clear();
    return;
  }

  // console.log('searchQuery: ', searchQuery);
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > MAX_LENGTH) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        console.clear();
        console.log(data);
        return;
      }

      if (data.length === 1) {
        const { name, flag, capital, population, languages } = data[0];
        const languagesNames = languages.map(lang => lang.name).join(', ');

        console.clear();
        console.table({ flag, name, capital, population, languagesNames });
        redrawInterface({ flag, name, capital, population, languagesNames });
        return { flag, name, capital, population, languagesNames };
      }

      console.clear();
      console.log(
        data.map(({ flag, name }) => {
          return { flag, name };
        }),
      );
      redrawInterface(
        data.map(({ flag, name }) => {
          return { flag, name };
        }),
      );
      return data.map(({ flag, name }) => {
        return { flag, name };
      });
    })
    .catch(error => {
      console.clear();
      console.error('error: ', error);
      // console.log('error.message: ', error.message);
      // console.dir(error);
      Notify.failure('Oops, there is no country with that name');
    });
}
