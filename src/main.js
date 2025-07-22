import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

export const refs = {
  form: document.querySelector('.form'),
  galleryList: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  input: document.querySelector('input'),
};

import {
  renderGalleryList,
  showLoader,
  hideLoader,
  clearMarkUp,
} from './js/render-functions.js';

// !submit
function onSubmit(event) {
  event.preventDefault();
  clearMarkUp();
  showLoader();
  const searchQuery = event.target.elements['search-text'].value.trim();
  if (!searchQuery) {
    hideLoader();
    refs.form.reset();
    return iziToast.error({
      title: 'Помилка!',
      message: 'Введіть ключеве слово пошуку!',
      position: 'center',
    });
  }

  getImagesByQuery(searchQuery)
    .then(res => {
      if (res.total === 0) {
        refs.form.reset();
        return iziToast.error({
          message:
            'На жаль, немає зображень, що відповідають вашому пошуковому запиту. Спробуйте ще раз!',
          position: 'center',
        });
      } else {
        renderGalleryList(res.hits);
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Помилка!',
        message: 'Не вдалося завантажити зображення. Не має звязку з ресурсом.',
        position: 'center',
      });
    })
    .finally(() => {
      hideLoader();
    });
}

refs.form.addEventListener('submit', onSubmit);
