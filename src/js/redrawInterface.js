import imageCardHBS from '../partials/imageCard.hbs';
import { refs } from './refs';

function redrawInterface(images) {
  if (!images) {
    refs.gallery.innerHTML = '';
    return;
  }

  if (images) {
    // refs.gallery.innerHTML += images.map(image => imageCardHBS(image)).join('');
    refs.gallery.append(
      ...images.map(image => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = imageCardHBS(image);
        newDiv.classList.add('photo-card');

        return newDiv;
      }),
    );
    return;
  }
}

export { redrawInterface };
