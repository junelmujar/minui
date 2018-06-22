/*
	Class: Base
	Author: Junel Mujar
	Description: Base class for all the components; includes utility methods 
	for iterating through arrays/NodeList, creating unique component ids and
	sending custom events to the window object
*/

export default class Base {

	constructor() {}
	
	/*
		IE/Edge Iterator alternative
		forEach method, could be shipped as part of an Object Literal/Module
		https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
	*/
	_forEach(array, callback, scope) {
	  	for (var i = 0; i < array.length; i++) {
	    	callback.call(scope, i, array[i]); // passes back stuff we need
	  	}
	}

	// Ref: https://gist.github.com/gordonbrander/2230317
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	_id() {
	  	return '_' + Math.random().toString(36).substr(2, 9);
	}

    _sendEvent(action, obj) {
        window.dispatchEvent(new CustomEvent(action, { bubbles: true, detail: obj }));               
    }	
}
