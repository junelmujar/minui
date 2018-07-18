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

			document.addEventListener('click', (e) => {
				if (typeof this.activeDropdown !== undefined && this.activeDropdown) {
					this.activeItem.classList.remove('bar__menu-item__link--active');
					this.activeDropdown.classList.remove('bar__menu-item__dropdown--visible');
				}
			});

			// document.addEventListener('touchend', (e) => {
			// 	if (e.type == 'click') {
			// 		if (typeof this.activeDropdown !== undefined && this.activeDropdown) {
			// 			// e.preventDefault();
			// 			// e.stopPropagation();
			// 			this.activeItem.classList.remove('bar__menu-item__link--active');
			// 			this.activeDropdown.classList.remove('bar__menu-item__dropdown--visible');
			// 		}
			// 	}
			// }, false);

			document.addEventListener('touchstart', function onFirstTouch(e) {
				if (e.type == 'click') {
					if (typeof this.activeDropdown !== undefined && this.activeDropdown) {
						// e.preventDefault();
						// e.stopPropagation();
						this.activeItem.classList.remove('bar__menu-item__link--active');
						this.activeDropdown.classList.remove('bar__menu-item__dropdown--visible');
					}
				}

				document.removeEventListener('touchstart', onFirstTouch, false);
			}, false);			

// window.addEventListener('touchstart', function onFirstTouch() {
//   // we could use a class
//   document.body.classList.add('user-is-touching');

//   // or set some global variable
//   window.USER_IS_TOUCHING = true;

//   // or set your app's state however you normally would
//   myFrameworkOfChoice.dispatchEvent('USER_IS_TOUCHING', true);

//   // we only need to know once that a human touched the screen, so we can stop listening now
//   window.removeEventListener('touchstart', onFirstTouch, false);
// }, false);

			document.addEventListener('keyup', (e) => {
				if (e.keyCode == 27) {
					if (typeof this.activeDropdown !== undefined && this.activeDropdown) {
						this.activeDropdown.classList.remove('bar__menu-item__dropdown--visible');
					}
				}
			});
		}
	}

	return Bar;
})();

export default Bar;