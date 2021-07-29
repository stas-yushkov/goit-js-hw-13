import imageCardHBS from '../partials/imageCard.hbs';
import { refs } from './refs';

function redrawInterface(images) {
  if (!images) {
    refs.gallery.innerHTML = '';
    return;
  }

  if (images) {
    refs.gallery.insertAdjacentHTML('beforeend', images.map(image => imageCardHBS(image)).join(''));
    return;
  }
}

export { redrawInterface };
