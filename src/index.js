import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import { refs } from './js/refs';
import { fetchPictures } from './js/fetchPictures';
import { redrawInterface } from './js/redrawInterface';
import storage from './js/storage';

console.log(refs);
const waitMS = 300;

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', debounce(onInput, waitMS));

async function onSubmit(e) {
  e.preventDefault();
  // console.log('submit event');
  let formData = new FormData(refs.form);

  // for (const entry of formData) {
  //   console.log(entry);
  // }

  // console.log(formData.get('searchQuery'));
  const searchQuery = formData.get('searchQuery');

  storage.save('lastSearchQuery', searchQuery);

  const picData = await fetchPictures(searchQuery);
  console.log(picData.data);

  if (picData.data.hits.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  //В ответе будет массив изображений удовлетворивших критериям параметров запроса. Каждое изображение описывается объектом, из которого тебе интересны только следующие свойства:
  // webformatURL - ссылка на маленькое изображение для списка карточек.
  // largeImageURL - ссылка на большое изображение.
  // tags - строка с описанием изображения. Подойдет для атрибута alt.
  // likes - количество лайков.
  // views - количество просмотров.
  // comments - количество комментариев.
  // downloads - количество загрузок.
  //

  const totalHits = picData.data.totalHits;
  Notify.success(`Hooray! We found ${totalHits} images.`);
  console.log('redrawInterface(picData.data) in progress....');
  const mappedHits = picData.data.hits.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return { webformatURL, largeImageURL, tags, likes, views, comments, downloads };
    },
  );
  console.log(picData.data.hits);
  console.log(mappedHits);
  await redrawInterface(mappedHits);
  console.log('redrawInterface(picData.data) .....DONE');
}

function onInput(e) {
  console.log('input');
  console.log(e.target.value);
}

// import { fetchCountries } from './js/fetchCountries';
// import { redrawInterface } from './js/redrawInterface';

// const inputRef = document.querySelector('input#search-box');

// const DEBOUNCE_DELAY = 300;
// const MAX_LENGTH = 10;

// inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// // onInput();

// function onInput(e) {
//   const searchQuery = e.target.value.trim();
//   // const searchQuery = 'sw';

//   if (searchQuery === '') {
//     Notify.failure('Search query must not be empty or just spaces');
//     redrawInterface();
//     console.clear();
//     return;
//   }

//   // console.log('searchQuery: ', searchQuery);
//   fetchCountries(searchQuery)
//     .then(data => {
//       if (data.length > MAX_LENGTH) {
//         Notify.info('Too many matches found. Please enter a more specific name.');
//         console.clear();
//         console.log(data);
//         return;
//       }

//       if (data.length === 1) {
//         const { name, flag, capital, population, languages } = data[0];
//         const languagesNames = languages.map(lang => lang.name).join(', ');

//         console.clear();
//         console.table({ flag, name, capital, population, languagesNames });
//         redrawInterface({ flag, name, capital, population, languagesNames });
//         return { flag, name, capital, population, languagesNames };
//       }

//       console.clear();
//       console.log(
//         data.map(({ flag, name }) => {
//           return { flag, name };
//         }),
//       );
//       redrawInterface(
//         data.map(({ flag, name }) => {
//           return { flag, name };
//         }),
//       );
//       return data.map(({ flag, name }) => {
//         return { flag, name };
//       });
//     })
//     .catch(error => {
//       console.clear();
//       console.error('error: ', error);
//       // console.log('error.message: ', error.message);
//       // console.dir(error);
//       Notify.failure('Oops, there is no country with that name');
//     });
// }
