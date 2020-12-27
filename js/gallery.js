'use strict'

import {default as images} from "./gallery-items.js";

const gallery = document.querySelector('.gallery');
const lightBox = document.querySelector('.lightbox');
const lightBoxImg = document.querySelector('.lightbox__image');
const closeButton = document.querySelector('.lightbox__button');
const overlay = document.querySelector('.lightbox__overlay');
let i = 0;

const galleryItem = ({ preview, original, description}) =>
`<li class="gallery__item">
<a
  class="gallery__link"
  href="${original}"
>
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    data-index="${i+=1}"
    alt="${description}"
  />
</a>
</li>`;

const imageList = images.map(image => {
const imageItem = galleryItem(image);
return imageItem;
}).join('');

gallery.insertAdjacentHTML('afterbegin', imageList);

const openLightBox = (event) => {
    if (event.target === event.currentTarget) {
        return;
    }
    event.preventDefault();
    lightBox.classList.add('is-open');
    lightBoxImg.setAttribute('src', `${event.target.getAttribute('data-source')}`);
}

const closeLightBox = (event) => {
    if ( lightBox.classList.contains('is-open') && event.target !== lightBox ) {
        lightBox.classList.remove('is-open');
        lightBoxImg.setAttribute('src', '');
     }
    return;
}
const controlKeys = (event) => {
    console.log (event.key);
    if (event.key === 'Escape')  {
        lightBox.classList.remove('is-open');
        lightBoxImg.setAttribute('src', '');
    }
}

  

gallery.addEventListener('click', openLightBox);

closeButton.addEventListener('click', closeLightBox);
overlay.addEventListener('click', closeLightBox);
document.body.addEventListener('keydown', controlKeys);