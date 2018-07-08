import Base from './base'

NodeList.prototype.forEach = Array.prototype.forEach;

const Bar = (() => {

	const Data = {
		BAR_TOGGLE: '[data-toggle=bar]',
		DROPDOWN_TOGGLE: '[data-toggle=bar__menu]',
	}

	class Bar extends Base {	

	    constructor() {

	    	super();

	    	this.toggle = {
	    		bars: document.querySelectorAll(Data.BAR_TOGGLE),
	    		dropdowns: document.querySelectorAll(Data.DROPDOWN_TOGGLE)
	    	}

	    	this.activeDropdown = null;

			// Initialize all bar togglers
			if (typeof this.toggle.bars !== 'undefined' && this.toggle.bars) {
				this.setupBars();
			}

			// Initialize all bar.dropdown togglers
			if (typeof this.toggle.dropdowns !== 'undefined' && this.toggle.dropdowns) {
				this.setupDropdowns();
			}
		}
		
		setupBars() {
			this.toggle.bars.forEach((toggle) => {
				toggle.addEventListener(this.interactEvent, (e) => {
					e.preventDefault();
					e.stopPropagation();
					var target = e.target.getAttribute('data-id');
					var menu = document.querySelector(`.bar__menu[for=${target}]`);
					menu.classList.toggle('bar__menu--visible');
				});
			});
		}

		setupDropdowns() {
			this.toggle.dropdowns.forEach((toggle) => {
				toggle.addEventListener(this.interactEvent, (e) => {
					e.preventDefault();
					e.stopPropagation();
					var target = e.target.getAttribute('data-id');
					var menu = document.querySelector(`.bar__menu-item__dropdown[for=${target}]`);
					
					if (!menu) return false;

					if (this.activeDropdown == menu) {
						menu.classList.toggle('bar__menu-item__dropdown--visible');
					} else {
						if (this.activeDropdown) {
							this.activeDropdown.classList.remove('bar__menu-item__dropdown--visible');
						}
						menu.classList.toggle('bar__menu-item__dropdown--visible');
					}

					this.activeDropdown = menu;
					
				});
			});

			var documentEvent = 'click';
			// if ('ontouchend' in document.documentElement === true) {
			// 	documentEvent = 'touchend';
			// }
			
			document.addEventListener(documentEvent, (e) => {
				if (!this.activeDropdown) return false;
				e.preventDefault();
				this.activeDropdown.classList.remove('bar__menu-item__dropdown--visible');
			});

			document.addEventListener('keyup', (e) => {
				if (!this.activeDropdown) return false;
				if (e.keyCode == 27) {
					this.activeDropdown.classList.remove('bar__menu-item__dropdown--visible');
				}
			});
		}
	}

	return Bar;
})();

export default Bar;