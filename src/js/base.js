/*
	Class: Base
	Author: Junel Mujar
	Description: Base class for all the components; includes utility methods 
	for iterating through arrays/NodeList, creating unique component ids and
	sending custom events to the window object
*/

export default class Base {

	constructor() {
	}

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

    _sendEvent(action, obj) {
        window.dispatchEvent(new CustomEvent(action, { bubbles: true, detail: obj }));               
    }	

    // Ref: https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/
    // Get the closest parent element with a matching selector
	_getClosest(elem, selector) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
		    Element.prototype.matches =
		        Element.prototype.matchesSelector ||
		        Element.prototype.mozMatchesSelector ||
		        Element.prototype.msMatchesSelector ||
		        Element.prototype.oMatchesSelector ||
		        Element.prototype.webkitMatchesSelector ||
		        function(s) {
		            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
		                i = matches.length;
		            while (--i >= 0 && matches.item(i) !== this) {}
		            return i > -1;
		        };
		}

		// Get the closest matching element
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}
		return null;

	};

}
