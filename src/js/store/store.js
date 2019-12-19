import PublisherSubscriber from '../lib/publisher-subscriber.js';

export default class Store {

	constructor(params) {
		let self = this;
		self.mutations = {};
		self.actions = {};
		self.state = {};
		self.status = 'resting';
		self.events = new PublisherSubscriber();

		if (params.hasOwnProperty('mutations')) {
			self.mutations = params.mutations;
		}
		if (params.hasOwnProperty('actions')) {
			self.actions = params.actions;
		}
		self.state = new Proxy((params.state || {}), {
			set: function (object, property, value) {
				if (value > 5) {
					console.log(`propery ${property} is changing inside proxy for value ${value}`)
					object[property] = value;
				} else {
					console.log('property is not bigger than 5, so cannot be changed');
				}
				self.events.publish('state_changed',self.state);
				return true;
			}
		});
	}

		/**
		 * this is dispather of actions. It looks for
		 * the action in collection of actions, and if it 
		 * finds one, runs it
		 * @param {string} action this is action key
		 * @param {mixed} payload
		 * @return {boolean}
		 */ 
		dispatch(action, payload) {
			let self = this;

			if(typeof self.actions[action] !== 'function') {
				console.log(`action ${action} doesn't exist.`);
				return false;
			}

			console.groupCollapsed(`ACTION ${action}`);

			self.status = 'action';
			self.actions[action](self, payload);
			console.groupEnd();

			return true;

		}

		/**
		 * looks for the mutation in collection of mutatiuons, and if it 
		 * finds one, modify the state of object by calling that mutation
		 * @param {string} mutation this is mutation key
		 * @param {mixed} payload
		 * @return {boolean}
		 */ 
		commit(mutation, payload) {
			let self = this;

			if(typeof self.mutations[mutation] !== 'function') {
				console.log(`mutation ${mutation} doesn't exist.`);
				return false;
			}

			console.groupCollapsed(`MUTATION ${action}`);

			self.status = 'mutation';
			self.mutations[mutation](self, payload);
			console.groupEnd();

			return true;

		}

	}
