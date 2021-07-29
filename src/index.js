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

  console.log('picData ', picData);

  if (picData.images.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  totalImages = picData.totalImages;

  Notify.success(`Hooray! We found ${totalImages} images.`);

  await redrawInterface(picData.images);

  showLoadMoreBtn(true);

  checkSearchResultEnd();
}

async function onLoadMore(e) {
  const picData = await fetchPictures(searchQuery, page, per_page);

  // const mappedHits = picData.images.map(
  //   ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
  //     return { webformatURL, largeImageURL, tags, likes, views, comments, downloads };
  //   },
  // );

  await redrawInterface(picData.images);

  console.log('arePicturesOver()', arePicturesOver());
  checkSearchResultEnd();
}

function arePicturesOver() {
  // if (totalImages > per_page * page) {
  //   return false;
  // } else {
  //   return true;
  // }

  return totalImages > per_page * page ? false : true;
}

function checkSearchResultEnd() {
  if (arePicturesOver()) {
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
  } else {
    //
    refs.loadMoreBtn.classList.add('visually-hidden');
  }
}
