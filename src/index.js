import './css/styles.scss';

import { Notify } from 'notiflix';

import { refs } from './js/refs';
import { fetchPictures } from './js/fetchPictures';
import { redrawInterface } from './js/redrawInterface';

const per_page = 40;
let searchQuery = '';
let page = 1;
let totalImages = 0;

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

showLoadMoreBtn(false);

//TODO: Словить ошибку промиса при непрогрузке ответа
async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(refs.form);

  searchQuery = formData.get('searchQuery').trim().split(' ').join('+');
  page = 1;
  redrawInterface();

  if (!searchQuery) {
    Notify.failure('Nothing loaded becose of empty search query');
    return;
  }

  const picData = await fetchPictures(searchQuery, page, per_page);

  if (picData.images.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  totalImages = picData.totalImages;

  Notify.success(`Hooray! We found ${totalImages} images.`);

  redrawInterface(picData.images);

  showLoadMoreBtn(true);

  checkSearchResultEnd();
}

async function onLoadMore(e) {
  const picData = await fetchPictures(searchQuery, page, per_page);

  redrawInterface(picData.images);

  checkSearchResultEnd();
}

function checkSearchResultEnd() {
  const arePicturesOver = totalImages > per_page * page ? false : true;

  if (arePicturesOver) {
    //
    Notify.failure("We're sorry, but you've reached the end of search results.");
    showLoadMoreBtn(false);
    return;
  }

  page += 1;
}

function showLoadMoreBtn(show) {
  if (show) {
    //
    refs.loadMoreBtn.classList.remove('visually-hidden');
    // refs.footer.classList.remove('visually-hidden');
  } else {
    //
    refs.loadMoreBtn.classList.add('visually-hidden');
    // refs.footer.classList.add('visually-hidden');
  }
}
