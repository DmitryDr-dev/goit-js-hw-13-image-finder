import './sass/main.scss';
import { searchForm, galleryList, loadMoreButton, lastElement } from './js/refs';
import { searchImage } from './js/pixabay-api';
import createImageCard from './templates/gallery-item.hbs';
import { error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';

loadMoreButton.style.visibility = 'hidden';
searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);
galleryList.addEventListener('click', openModal);

const searchProps = {
  searchQuery: undefined,
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observer = new IntersectionObserver(onLoadMore, options);
observer.observe(loadMoreButton);

async function onSearch(e) {
  e.preventDefault();
  searchImage.resetPageNumber();
  clearGallery();

  searchProps.searchQuery = e.target.query.value;
  const data = await searchImage.fetchImg(searchProps.searchQuery);

  if (data.length === 0) {
    onError();
  }
  renderGallery(data);

  // if (data.length > 11) {
  //   loadMoreButton.style.visibility = 'visible';
  // }
}

function renderGallery(data) {
  const markup = createImageCard(data);
  galleryList.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  loadMoreButton.style.visibility = 'hidden';
  galleryList.innerHTML = '';
}

async function onLoadMore() {
  searchImage.increasePageNumber();
  const data = await searchImage.fetchImg(searchProps.searchQuery);
  renderGallery(data);
}

function onError() {
  error({
    title: 'Nothing Found!',
    text: 'Please enter the correct query!',
    delay: 1500,
  });
}

function openModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  basicLightbox
    .create(
      `
    <img src="${e.target.dataset.src}" width="800" height="600">
`,
    )
    .show();
}
