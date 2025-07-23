import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  showLoader,
  hideLoader,
  clearMarkUp,
  createLightbox,
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

  refs.loadMoreBtn.classList.add('is-hidden');

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

    refs.galleryList.innerHTML = createGallery(getResponse.hits);
    createLightbox();

    iziToast.info({
      title: 'Результат пошуку:',
      message: `знайдено ${getResponse.totalHits} фотографій!`,
      position: 'center',
    });

    if (getResponse.totalHits > perPage) {
      refs.loadMoreBtn.classList.remove('is-hidden');
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

    const scrollHeight = cardHeight * 5 + gap;

    window.scrollBy({
      top: scrollHeight,
      behavior: 'smooth',
    });
  }
}

async function onClick(event) {
  event.preventDefault;
  const currentScrollPosition = window.scrollY;
  refs.galleryList.classList.add('is-hidden');
  refs.loadMoreBtn.classList.add('is-hidden');
  page++;

  showLoader();

  try {
    const getResponse = await getImagesByQuery(searchQuery, page, perPage);

    if (getResponse.hits.length === 0) {
      iziToast.info({
        title: 'Увага',
        message: 'Більше зображень немає',
        position: 'center',
      });
      return;
    }

    refs.galleryList.insertAdjacentHTML(
      'beforeend',
      createGallery(getResponse.hits)
    );

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: currentScrollPosition,
        behavior: 'instant',
      });

      smoothScroll();
    });

    const lastPage = Math.ceil(getResponse.totalHits / perPage);

    refs.loadMoreBtn.classList.remove('is-hidden');

    if (lastPage === page) {
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.loadMoreBtn.removeEventListener('click', onClick);

      iziToast.info({
        title: 'Увага',
        message: 'Остання сторінка!',
        position: 'center',
      });
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Помилка!',
      message: 'Не вдалося завантажити більше зображень',
      position: 'center',
    });
  } finally {
    hideLoader();
    refs.galleryList.classList.remove('is-hidden');
  }
}

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onClick);
