import PublisherSubscriber from '../lib/publisher-subscriber.js';

/**
 * Define object with properties: 
 * {state: {Object instanceof Proxy}, actions:{Object}, mutations: {Objects}, events: {Object instance of PublisherSubscriber}}
 */

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
		if(!sessionStorage.getItem("session")) {
			sessionStorage.setItem("session",JSON.stringify(params.state));
			console.log(sessionStorage.getItem("session"))
	}
	let s = sessionStorage.getItem("session");
	console.log(JSON.parse(s))
	self.s = JSON.parse(s);
	// self.s = s;
		self.state = new Proxy(self.s, {
			set: function (object, property, value) {
				object[property] = value;
				sessionStorage.setItem("session",JSON.stringify(object))
				console.log(`state changed ${property} : ${value}`);
				self.events.publish('state_changed', self.state);

				if (self.status != 'mutation') {
					console.log(`Warning: You should change ${property} using mutation, not directly`);
				}
				self.status = 'resting';
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

		if (typeof self.actions[action] !== 'function') {
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

		if (typeof self.mutations[mutation] !== 'function') {
			console.log(`mutation ${mutation} doesn't exist.`);
			return false;
		}

		self.status = 'mutation';
		let newState = self.mutations[mutation](self.state, payload);
		self.state = Object.assign(self.state, newState);

		return true;

	}

}
