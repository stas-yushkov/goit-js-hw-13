import axios from 'axios';

const key = process.env.PIXABAY_API_KEY;

const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';
const BASE_URL = 'https://pixabay.com/api/';
const URL = `${BASE_URL}`;
export default class PixabayAPI {
  constructor() {
    this._perPage = 40;
    this.searchQuery = '';
    this._page = 1;
    this.totalImages = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery.trim().split(' ').join('+');
  }

  resetPage() {
    this._page = 1;
  }

  fetchPictures() {
    const paramsObj = {
      params: {
        key,
        q: this.searchQuery,
        image_type: imageType,
        orientation,
        safesearch,
        page: this._page,
        per_page: this._perPage,
      },
    };

    return axios.get(URL, paramsObj).then(resp => {
      const images = resp.data.hits.map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
          return { webformatURL, largeImageURL, tags, likes, views, comments, downloads };
        },
      );

      const totalImages = resp.data.totalHits;
      const result = { totalImages, images };

      return result;
    });
  }

  get totalImgs() {
    return this.totalImages;
  }

  set totalImgs(newTotalImages) {
    this.totalImages = newTotalImages;
  }

  get perPage() {
    return this._perPage;
  }

  set perPage(newPerPage) {
    this._perPage = newPerPage;
  }

  get page() {
    return this._page;
  }
  set page(newPage) {
    this._page = newPage;
  }

  incrementPage() {
    this._page += 1;
  }
}
