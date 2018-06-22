import Inputs from './inputs'
import Tooltips from './tooltips'
import Tabs from './tabs'
import Modals from './modals'
import Dropdowns from './dropdowns'
import Navs from './navs'

document.addEventListener("DOMContentLoaded", function(){

	function forEach(array, callback, scope) {
	  	for (var i = 0; i < array.length; i++) {
	    	callback.call(scope, i, array[i]); // passes back stuff we need
	  	}
	};

	new Tooltips;
	new Inputs;
	new Tabs;
	new Modals;
	new Dropdowns;
	new Navs;

	function htmlEntities(str) {
	    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	var code = document.querySelectorAll('code');
	code.forEach(function(el, i) {
		el.innerHTML = htmlEntities(el.innerHTML);
	});
});