import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from '../main';

import { page } from '../main';

let gallery;

export function createLightbox() {
  if (!gallery) {
    gallery = new SimpleLightbox('.gallery a');
  }
  gallery.refresh();
}

export function createGallery(arrayImages, page) {
  const markup = arrayImages
    .map(
      item =>
        `<li class="img-box">
          <a href="${item.largeImageURL}">
            <img 
              src="${item.webformatURL}" 
              alt="${item.tags}" 
              width="360" 
              height="200"
            >
            <ul class="subscriptions">
                <li class="sub-title">
                  <h6>Likes</h6>
                  <p>${item.likes}</p>
                </li>
                <li class="sub-title">
                  <h6>Views</h6>
                  <p>${item.views}</p>
                </li>
                <li class="sub-title">
                  <h6>Comments</h6>
                  <p>${item.comments}</p>
                </li>
                <li class="sub-title">
                  <h6>Downloads</h6>
                  <p>${item.downloads}</p>
                </li>
            </ul>
          </a>
        </li>`
    )
    .join('');

  if (page === 1) {
    refs.galleryList.innerHTML = markup;
  } else {
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
  }
}

export function hideLoader() {
  refs.loader.classList.add('is-hidden');
}
export function showLoader() {
  refs.loader.classList.remove('is-hidden');
}
export function clearMarkUp() {
  refs.galleryList.innerHTML = '';
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
