import axios from 'axios';
// axios.get('/users')
//   .then(res => {
//     console.log(res.data);
//   });

// Список параметров строки запроса которые тебе обязательно необходимо указать:

// key - твой уникальный ключ доступа к API.
const key = '22654483-4e0bcca85732e009257bb92c7';
// q - термин для поиска. То, что будет вводить пользователь. (searchQuery)

// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
const image_type = 'photo';
// orientation - ориентация фотографии. Задай значение horizontal.
const orientation = 'horizontal';
//   safesearch - фильтр по возрасту.Задай значение true.
const safesearch = 'true';

// page	int	Returned search results are paginated. Use this parameter to select the page number.
// Default: 1
let page = 1;
// per_page	int	Determine the number of results per page.
// Accepted values: 3 - 200
// Default: 20
const per_page = 40;

async function fetchPictures(searchQuery) {
  console.log('fetchPictures with searchQuery', searchQuery);
  const BASE_URL = 'https://pixabay.com/api/';
  // const URL = `${BASE_URL}?key=${key}&q=${searchQuery}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`;
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
  const resp = await axios(URL, paramsObj);
  console.log(resp);
}

export { fetchPictures };
