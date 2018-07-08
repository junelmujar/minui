import Base from './base'

NodeList.prototype.forEach = Array.prototype.forEach;

const Bar = (() => {

	const Data = {
		BAR_TOGGLE: '[data-toggle=bar]',
		BAR_MENU_TOGGLE: '[data-toggle=bar__menu]',
	}

	class Bar extends Base {	

	    constructor() {

	    	super();

			// Initialize all found tabs
			this._bar_togglers  = document.querySelectorAll(Data.BAR_TOGGLE);
			this._menu_togglers = document.querySelectorAll(Data.BAR_MENU_TOGGLE);
			if (typeof this._bar_togglers !== 'undefined' && this._bar_togglers) {
				this.setup();
			}
		}
		
		setup() {
			this._bar_togglers.forEach((toggle) => {
				toggle.addEventListener(this.interactEvent, (e) => {
					e.preventDefault();
					e.stopPropagation();
					var target = e.target.getAttribute('data-id');
					var menu = document.querySelector(`.bar__menu[for=${target}]`);
					menu.classList.toggle('bar__menu--visible');
				});
			});

			this._menu_togglers.forEach((toggle) => {
				toggle.addEventListener(this.interactEvent, (e) => {
					e.preventDefault();
					e.stopPropagation();
					var target = e.target.getAttribute('data-id');
					var menu = document.querySelector(`.bar__menu-item__dropdown[for=${target}]`);
					menu.classList.toggle('bar__menu-item__dropdown--visible');
				});
			});
		}
	}

	return Bar;
})();

export default Bar;