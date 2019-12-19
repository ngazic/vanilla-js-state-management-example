console.log('hello form main.js')
import PublisherSubscriber from './lib/publisher-subscriber.js';
import Store from './store/store.js';

var obj = new PublisherSubscriber();
function A(data) {
	console.log('this is function A');
	console.log(data);
}
function B(data) {
	console.log('this is function B');
	console.log(data);
}
function C(data) {
	console.log('this is function C');
	console.log(data);
}
function D(data) {
	console.log('this is function D');
	console.log(data);
}
let a = obj.subscribe('klikaj', A);
console.log(a)
a = obj.subscribe('klikaj', B);
a = obj.subscribe('klikaj', C);
a = obj.subscribe('klikaj', D);
console.log(a)
obj.publish('klikaj',23)

let store = new Store({state: {
	counter: 0
}});
console.log("the store object is ")
console.log(store)
console.log(store.state)
store.state.counter = 10;
console.log(store.state)
store.state.counter = 2;
console.log(store.state)
store.state.cockSuccer = 233;
console.log(store.state)