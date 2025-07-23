import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  showLoader,
  hideLoader,
  clearMarkUp,
  createLightbox,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

export const refs = {
  form: document.querySelector('.form'),
  galleryList: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  input: document.querySelector('input'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

export let page = 1;
export let searchQuery = '';
export const perPage = 15;

// !submit
async function onSubmit(event) {
  event.preventDefault();
  page = 1;
  clearMarkUp();
  showLoader();

  hideLoadMoreButton();

  searchQuery = event.target.elements['search-text'].value.trim();

  if (!searchQuery) {
    hideLoader();
    refs.form.reset();
    return iziToast.error({
      title: 'Помилка!',
      message: 'Введіть ключеве слово пошуку!',
      position: 'center',
    });
  }

  try {
    const getResponse = await getImagesByQuery(searchQuery, page, perPage);

    if (getResponse.hits.length === 0) {
      iziToast.error({
        title: 'Помилка!',
        message: 'Зображення не знайдено',
        position: 'center',
      });
      return;
    }
    //   !!!!!!!!!!!!!!!!1
    createGallery(getResponse.hits, page);
    createLightbox();
    // !!!!!!!!!!!!!!!!!!11
    iziToast.info({
      title: 'Результат пошуку:',
      message: `знайдено ${getResponse.totalHits} фотографій!`,
      position: 'center',
    });

    if (getResponse.totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Помилка!',
      message: 'Не вдалося завантажити зображення',
      position: 'center',
    });
  } finally {
    hideLoader();
  }
}

// ! прокрутка
function smoothScroll() {
  const galleryItem = document.querySelector('.img-box');

  if (galleryItem) {
    const cardHeight = galleryItem.getBoundingClientRect().height;

    const gap =
      parseInt(window.getComputedStyle(galleryItem.parentElement).gap) || 0;

    const scrollHeight = cardHeight * 2 + gap;

    window.scrollBy({
      top: scrollHeight,
      behavior: 'smooth',
    });
  }
}

async function onClick(event) {
  event.preventDefault();
  page++; // Інкрементуємо сторінку перед запитом

  showLoader();
  hideLoadMoreButton();

  try {
    const getResponse = await getImagesByQuery(searchQuery, page, perPage);

    // Якщо зображень немає
    if (getResponse.hits.length === 0) {
      iziToast.info({
        title: 'Увага',
        message: 'Більше зображень немає',
        position: 'center',
      });
      hideLoadMoreButton();
      return;
    }

    // Додаємо тільки нові зображення
    createGallery(getResponse.hits, page);
    createLightbox(); // Оновлюємо lightbox

    // Перевірка останньої сторінки
    const lastPage = Math.ceil(getResponse.totalHits / perPage);
    if (page >= lastPage) {
      refs.loadMoreBtn.classList.add('is-hidden');
      iziToast.info({
        title: 'Увага',
        message: 'Це останні зображення',
        position: 'center',
      });
    } else {
      showLoadMoreButton();
    }

    // Плавна прокрутка
    smoothScroll();
  } catch (error) {
    console.error('Помилка завантаження:', error);
    iziToast.error({
      title: 'Помилка!',
      message: 'Не вдалося завантажити зображення',
      position: 'center',
    });
  } finally {
    hideLoader();
  }
}

// async function onClick(event) {
//   event.preventDefault();
//   const currentScrollPosition = window.scrollY;
//   //   refs.galleryList.classList.add('is-hidden');
//   //   refs.loadMoreBtn.classList.add('is-hidden');
//   page++;

//   showLoader();
//   refs.loadMoreBtn.classList.add('is-hidden');

//   try {
//     const getResponse = await getImagesByQuery(searchQuery, page, perPage);

//     if (getResponse.hits.length === 0) {
//       iziToast.info({
//         title: 'Увага',
//         message: 'Більше зображень немає',
//         position: 'center',
//       });
//       return;
//     }
//     // !!!!!!!!!!!!!1
//     createGallery(getResponse.hits, page);
//     // !!!!!!!!!!!!!!!!!!1
//     window.requestAnimationFrame(() => {
//       window.scrollTo({
//         top: currentScrollPosition,
//         behavior: 'instant',
//       });

//       smoothScroll();
//     });

//     const lastPage = Math.ceil(getResponse.totalHits / perPage);

//     refs.loadMoreBtn.classList.remove('is-hidden');

//     if (lastPage === page) {
//       refs.loadMoreBtn.classList.add('is-hidden');
//       refs.loadMoreBtn.removeEventListener('click', onClick);

//       iziToast.info({
//         title: 'Увага',
//         message: 'Остання сторінка!',
//         position: 'center',
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     iziToast.error({
//       title: 'Помилка!',
//       message: 'Не вдалося завантажити більше зображень',
//       position: 'center',
//     });
//   } finally {
//     hideLoader();
//     refs.galleryList.classList.remove('is-hidden');
//   }
// }

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onClick);
