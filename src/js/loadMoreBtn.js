export default class LoadMoreBtn {
  constructor({ ref, hide } = {}) {
    this.button = ref;
    hide ? this.hide() : this.show();
  }

  show() {
    this.button.classList.remove('visually-hidden');
  }

  hide() {
    this.button.classList.add('visually-hidden');
  }
}
