export default class PublisherSubscriber {

	constructor() {
		this.events = {};
	}

	/**
	 * Either create new event with passed 'event' name
	 * or add callback to existing event
	 * @param {string} event
	 * @param {function} callback
	 * @returns {number} A number of callbacks for this event
	 */
	subscribe(event, callback) {
		let self = this;
		if(!self.events.hasOwnProperty(event)) {
			self.events[event] = [];
		}
		return self.events[event].push(callback);
	}

	/**
	 * @param {string} event
	 * @param {object} data [data={}]
	 * @return {array} array of all callbacks or empty array if event doesn't exist
	 */
	publish(event, data={}) {
		let self = this;
		if(!self.events.hasOwnProperty(event)) {
			return [];
		}
	 	return self.events[event].map(value =>  value(data));
		
	}
}