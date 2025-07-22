import axios from 'axios';

export function getImagesByQuery(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '51363368-0cc0b280f35048ea67ead6bf3';

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 9,
  };

  return axios(BASE_URL, { params })
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
}
