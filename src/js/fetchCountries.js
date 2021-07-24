const BASE_URL = 'https://restcountries.eu/rest/v2/';
const SERVICE = 'name/';
const SEARCH_FIELDS = ['name', 'flag', 'capital', 'population', 'languages'].join(';');
const FILTER_RESPONSE_QUERY = `?fields=${SEARCH_FIELDS}`;

function fetchCountries(countryName) {
  return fetch(`${BASE_URL}${SERVICE}${countryName}${FILTER_RESPONSE_QUERY}`)
    .then(res => {
      // console.log('res: ', res);

      if (res.status !== 200) {
        return Promise.reject(`response.status: ${res.status}`);
        throw new Error(`res.status: ${res.status}`);
        // return;
      }
      return res.json();
    })
    .then(data => {
      // console.log('data: ', data);

      return data;
    });
}

export { fetchCountries };
