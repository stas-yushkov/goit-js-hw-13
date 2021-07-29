export default class LoadMoreBtn {
  constructor({ ref } = {}) {
    this.button = ref;
  }

  show() {
    this.button.classList.remove('visually-hidden');
  }

  hide() {
    this.button.classList.add('visually-hidden');
  }
}
