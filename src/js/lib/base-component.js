import Store from '../store/store.js';

/**
 * Components will be created as: 
 *  new Component(what_store_object_shall_I_use, what_DOM_element_will_be_attached_to)
 */ 

export default class Component {
  constructor(props) {
    let self = this;
    self.render = self.render || function() {};

    if(props.store instanceof Store) {
      props.store.events.subscribe('state_changed', () => self.render());
    }
    if(props.hasOwnProperty('element')) {
      self.element = props.element;
    }
  }
}
