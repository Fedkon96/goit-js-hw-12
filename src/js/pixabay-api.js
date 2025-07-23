import axios from 'axios';

export async function getImagesByQuery(searchQuery, page, perPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '51363368-0cc0b280f35048ea67ead6bf3';

  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  };

  const resData = await axios.get(BASE_URL, { params });

  return resData.data;
}
