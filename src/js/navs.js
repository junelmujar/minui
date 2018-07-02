import Base from './base'

const Navs = (() => {

	const Data = {
		TOGGLE: '.navbar__toggle',
		LINK: '.nav__item-link'
	}

	class Navs extends Base {	

	    constructor() {

	    	super();

			// Initialize all found tabs
			this._toggles   = document.querySelectorAll(Data.TOGGLE);
			this._links     = document.querySelectorAll(Data.LINK);
			this._activeId  = '';
			
			if (typeof this._toggles !== 'undefined' && this._toggles) {
				this.setup();
				this.bindListeners();
			}
		}
		
		setup() {

			var that = this;
			this._forEach(this._toggles, function(index, toggle) {
				toggle.addEventListener('click', function(event) {
					event.preventDefault();
					event.stopPropagation();
					var targetId = event.target.getAttribute('data-id');
					var target = document.querySelector(`[for='${targetId}'`);
					target.classList.toggle('nav--collapsed');
				});
			});

			// Dropdown
			this._forEach(this._links, function(index, link) {
				link.addEventListener('click', function(event) {
					var parent = that._getClosest(event.target, '.nav__item-link');
					if (typeof parent !== undefined && parent) {
						var targetId = parent.getAttribute('data-id');
						var target = document.querySelector(`.nav__item-menu[for=${targetId}]`);
						that._activeId = targetId;
						if (typeof target !== undefined && target) {
							event.preventDefault();
							event.stopPropagation();
							target.classList.toggle('nav__item-menu--visible');
							that.hideDropdowns();
						}
					}
				});
			});			
		}	

		hideDropdowns(ref) {
			var that = this;
			var dropdowns = document.querySelectorAll('.nav__item-menu--visible');
			this._forEach(dropdowns, function(index, dropdown) {
				var dropdownId = dropdown.getAttribute('for');
				if (dropdownId != that._activeId) {
					dropdown.classList.remove('nav__item-menu--visible');
				}
			});
		}

		bindListeners() {
			var that = this;
			document.addEventListener('click', function(event) {
				var dropdowns = document.querySelectorAll('.nav__item-menu--visible');
				that._forEach(dropdowns, function(index, dropdown) {
					dropdown.classList.remove('nav__item-menu--visible');
				});
			});
			document.addEventListener('keyup', function(event) {
				if (event.keyCode == 27) {
					var navs = document.querySelectorAll('.nav--collapsible');
					that._forEach(navs, function(index, nav) {
						nav.classList.add('nav--collapsed');
					});	
					var dropdowns = document.querySelectorAll('.nav__item-menu--visible');
					that._forEach(dropdowns, function(index, dropdown) {
						dropdown.classList.remove('nav__item-menu--visible');
					});
				}
			});
			window.addEventListener('resize', function(event) {
				var dropdowns = document.querySelectorAll('.nav__item-menu--visible');
				that._forEach(dropdowns, function(index, dropdown) {
					dropdown.classList.remove('nav__item-menu--visible');
				});
			});
		}

	}

	return Navs;
})();

export default Navs;