import './css/styles.scss';

import { Notify } from 'notiflix';

import { refs } from './js/refs';
// import { fetchPictures } from './js/fetchPictures';
import { redrawInterface } from './js/redrawInterface';

import PixabayAPI from './js/pixabayAPI';
import LoadMoreBtn from './js/loadMoreBtn';

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const pixabayAPI = new PixabayAPI();
const loadMoreBtn = new LoadMoreBtn({
  ref: refs.loadMoreBtn,
  hide: true,
});

function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(refs.form);

  pixabayAPI.query = formData.get('searchQuery');
  pixabayAPI.resetPage();

  redrawInterface();

  if (!pixabayAPI.query) {
    Notify.failure('Nothing loaded becose of empty search query');
    return;
  }

  pixabayAPI
    .fetchPictures()
    .then(picData => {
      if (picData.images.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      }
      pixabayAPI.totalImgs = picData.totalImages;

      Notify.success(`Hooray! We found ${pixabayAPI.totalImgs} images.`);

      redrawInterface(picData.images);

      checkSearchResultEnd();
    })
    .catch(error => {
      handlePromiseError(error);
    });
}

function onLoadMore(e) {
  e.preventDefault();

  pixabayAPI
    .fetchPictures()
    .then(picData => {
      redrawInterface(picData.images);

      checkSearchResultEnd();
    })
    .catch(error => {
      handlePromiseError(error);
    });
}

function checkSearchResultEnd() {
  loadMoreBtn.show();

  const arePicturesOver =
    pixabayAPI.totalImgs > pixabayAPI.perPage * pixabayAPI.page ? false : true;

  if (arePicturesOver) {
    //
    Notify.failure("We're sorry, but you've reached the end of search results.");
    loadMoreBtn.hide();
    return;
  }

  pixabayAPI.incrementPage();
}

function handlePromiseError(error) {
  console.error('Oh, no, no, no...', error.message);
  console.dir(error);
}
