import Base from './base'

const Navs = (() => {

	const Data = {
		TOGGLE: '[data-toggle=nav]',
		LINK: '.nav-item-link'
	}

	class Navs extends Base {	

	    constructor() {

	    	super();

			// Initialize all found tabs
			this._toggles   = document.querySelectorAll(Data.TOGGLE);
			this._links     = document.querySelectorAll(Data.LINK);
			
			if (typeof this._toggles !== 'undefined' && this._toggles) {
				this.setup();
				this.bindListeners();
			}
		}
		
		setup() {

			var that = this;
			
			// Toggle menu on smaller devices
			this._toggles.forEach(function(el, i) {
				el.addEventListener('click', function(event) {
					event.preventDefault();
					var targetNavID = this.getAttribute('href');
					var targetNav   = document.querySelector(targetNavID);
					event.target.classList.toggle('nav-item__active');
					targetNav.classList.toggle('nav-items__open');
				});
			});		

			// Links
			var ctr = 1;
			this._links.forEach((el, i) => {

				var id = that._id();
				
				el.parentNode.setAttribute('_id', id);
				if (el.parentNode.classList.contains('nav-item__active')) {
					that.activeId = id;
				}

				el.addEventListener('click', (event) => {

					// Get current active nav item
					var previous = document.querySelector('[_id='+that.activeId+']');

					if (this.activeId == event.target.parentNode.getAttribute('_id')) {
						event.target.parentNode.classList.toggle('nav-item__active');
						event.target.nextElementSibling.classList.toggle('dropdown__visible');
					} else {
						if (previous && previous !== 'undefined') {
							previous.classList.remove('nav-item__active');
							if (previous.children) {
								this._forEach(previous.children, function(index, child) {
									if (child.classList.contains('dropdown__visible')) {
										child.classList.remove('dropdown__visible');
									}
								});
							}	
						}
						event.target.parentNode.classList.toggle('nav-item__active');
						event.target.nextElementSibling.classList.toggle('dropdown__visible');
					}

					// Set new active id
					this.activeId = event.target.parentNode.getAttribute('_id');
				});
			});				
		}	

		hideDropdowns(ref) {
			var navItems = document.querySelectorAll('.nav-item');
			ref._forEach(navItems, function(index, el) {
				if (typeof el !== 'undefined') {
					if (el.nextElementSibling) {
						el.classList.remove('nav-item__active');
						if (typeof el.children !== 'undefined') {
							ref._forEach(el.children, function(index, child) {
								if (typeof child !== 'undefined') {
									if (child.classList.contains('dropdown')) {
										child.classList.remove('dropdown__visible');
									}
								}
							});
						}
					}
				}
			});			
		}

		bindListeners() {

			var that = this;

			// Hide dropdowns on Esc and document click
            document.addEventListener('keyup', (event) => {
                if (event.keyCode == 27) {
					this.hideDropdowns(this);	
				}
			});

            document.addEventListener('click', (event) => {
            	this.hideDropdowns(this);
			});

			// Mobile
			var togglers = document.querySelectorAll(Data.TOGGLE);
			if (window.outerWidth <= 768) {
				togglers.forEach(function(el, i) {
					el.parentNode.classList.add('nav__collapsed');
					el.nextElementSibling.classList.remove('nav-items__open');
				});
			} else {
				togglers.forEach(function(el, i) {
					el.parentNode.classList.remove('nav__collapsed');
				});
			}

			window.addEventListener('resize', function(event) {
				if (typeof event.target !== undefined) {
					if (event.target.outerWidth <= 768) {
						togglers.forEach(function(el, i) {
							el.parentNode.classList.add('nav__collapsed');
							el.nextElementSibling.classList.remove('nav-items__open');
						});
					} else {
						togglers.forEach(function(el, i) {
							el.parentNode.classList.remove('nav__collapsed');
						});
					}
				}
			});
		}

	}

	return Navs;
})();

export default Navs;