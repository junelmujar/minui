import Inputs from './inputs'
import Tooltips from './tooltips'
import Tabs from './tabs'
import Modals from './modals'
import Dropdowns from './dropdowns'
import Navs from './navs'

new Tooltips;
new Inputs;
new Tabs;
new Modals;
new Dropdowns;
new Navs;

export {
	Tabs,
	Inputs,
	Modals,
	Dropdowns,
	Navs,
	Tooltips
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var code = document.querySelectorAll('code');
code.forEach(function(el, i) {
	el.innerHTML = htmlEntities(el.innerHTML);
});
