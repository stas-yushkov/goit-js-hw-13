import axios from 'axios';

const key = '22654483-4e0bcca85732e009257bb92c7';
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';

async function fetchPictures(searchQuery, page, per_page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const URL = `${BASE_URL}`;

  const paramsObj = {
    params: {
      key,
      q: searchQuery,
      image_type,
      orientation,
      safesearch,
      page,
      per_page,
    },
  };
  try {
    const resp = await axios.get(URL, paramsObj);

    const images = resp.data.hits.map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return { webformatURL, largeImageURL, tags, likes, views, comments, downloads };
      },
    );

    const totalImages = resp.data.totalHits;
    const result = { totalImages, images };

    return result;
  } catch (error) {
    console.log(error);
    console.log(error.message);

    return;
  }
}

export { fetchPictures };
