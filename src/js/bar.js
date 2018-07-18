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
	    	this.activeItem = null;

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
					var parent = this._getClosest(e.target, '.bar__toggle');
					var target = parent.getAttribute('data-id');
					var menu   = document.querySelector(`.bar__menu[for=${target}]`);
					menu.classList.toggle('bar__menu--visible');
				});
			});
		}

		setupDropdowns() {
			this.toggle.dropdowns.forEach((toggle) => {
				toggle.addEventListener(this.interactEvent, (e) => {
					var isToggle = e.target.getAttribute('data-toggle') === 'bar__menu';

					if (isToggle) {
						e.preventDefault();
						e.stopPropagation();

						var target = e.target.getAttribute('data-id');
						var menu   = document.querySelector(`.bar__menu-item__dropdown[for=${target}]`);
						
						e.target.classList.toggle('bar__menu-item__link--active');

						if (!menu) return false;
					
						if (this.activeDropdown == menu) {
							menu.classList.toggle('bar__menu-item__dropdown--visible');
						} else {
							if (this.activeDropdown) {
								this.activeDropdown.classList.remove('bar__menu-item__dropdown--visible');
							}
							menu.classList.toggle('bar__menu-item__dropdown--visible');
						}

						this.activeItem     = event.target;
						this.activeDropdown = menu;
					}
				});
			});

			window.addEventListener('click', (e) => {
				this.collapseActiveDropdown(e.target);
			});

			var that = this;
			window.addEventListener('touchstart', function onFirstTouch(e) {
				that.collapseActiveDropdown(e.target);
				window.removeEventListener('touchstart', onFirstTouch, { capture: false });
			}, { capture: false });			

			document.addEventListener('keyup', (e) => {
				if (e.keyCode == 27) {
					this.collapseActiveDropdown(e.target);
				}
			});
		}

		collapseActiveDropdown(target) {
			var parent = this._getClosest(target, '.bar__menu-item');
			if (!parent) {
				var activeLink = document.querySelector(`.bar__menu-item__link--active`);
				var activeMenu = document.querySelector(`.bar__menu-item__dropdown--visible`);
				if (typeof activeMenu !== undefined && activeMenu) {
					activeLink.classList.remove('bar__menu-item__link--active');
					activeMenu.classList.remove('bar__menu-item__dropdown--visible');
				}
			}
		}
	}

	return Bar;
})();

export default Bar;