import Component from '../lib/base-component.js';
import store from '../store/central-store-object/index.js';

export default class List extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.js-items')
    });
  }

  render() {
    let self = this;

    if(store.state.items.length === 0) {
      self.element.innerHTML = `<p class="no-items">There is no items added </p>`;
      return;
    }

    self.element.innerHTML =`
      <ul class="app__items">
        ${store.state.items.map(item => {return `
          <li>${item}<button aria-labe="delete this button">x</button></li>`})}
      </ul>`;
    
    self.element.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('click', () => {
        store.dispatch('clearItem',{index})});
    });
  }
}