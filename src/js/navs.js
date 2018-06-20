const Navs = (() => {

	const Data = {
		TOGGLE: '[data-toggle=nav]',
		LINK: '.nav-item-link'
	}

	class Navs {	

	    constructor() {
			// Initialize all found tabs
			this._toggles   = document.querySelectorAll(Data.TOGGLE);
			this._links     = document.querySelectorAll(Data.LINK);
			
			if (typeof this._toggles !== 'undefined' && this._toggles) {
				this.setup();
				this.bindListeners();
			}
		}

		_id() {
			// Ref: https://gist.github.com/gordonbrander/2230317
			// Math.random should be unique because of its seeding algorithm.
			// Convert it to base 36 (numbers + letters), and grab the first 9 characters
			// after the decimal.
		  	return '_' + Math.random().toString(36).substr(2, 9);
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
			this._links.forEach(function(el, i) {

				var id = that._id();
				el.parentNode.setAttribute('_id', id);
				if (el.parentNode.classList.contains('nav-item__active')) {
					that.activeId = id;
				}

				el.addEventListener('click', function(event) {

					// Get current active nav item
					var previous = document.querySelector('[_id='+that.activeId+']');

					if (that.activeId == event.target.parentNode.getAttribute('_id')) {
						event.target.parentNode.classList.toggle('nav-item__active');
						event.target.nextElementSibling.classList.toggle('dropdown__visible');
					} else {
						if (previous) {
							previous.classList.remove('nav-item__active');
							if (previous.children) {
								for (var child of previous.children) {
									if (child.classList.contains('dropdown__visible')) {
										child.classList.remove('dropdown__visible');
									}
								}						
							}	
						}
						event.target.parentNode.classList.toggle('nav-item__active');
						event.target.nextElementSibling.classList.toggle('dropdown__visible');
					}

					// Set new active id
					that.activeId = event.target.parentNode.getAttribute('_id');
				});
			});				
		}	

		hideDropdowns() {
			var navItems = document.querySelectorAll('.nav-item');
			navItems.forEach(function(el, i) {
				if (typeof el !== 'undefined') {
					if (el.nextElementSibling) {
					el.classList.remove('nav-item__active');
					if (typeof el.children !== 'undefined') {
						for (var child of el.children) {
							if (typeof child !== 'undefined') {
								if (child.classList.contains('dropdown')) {
									child.classList.remove('dropdown__visible');
								}
							}
						}
					}
					}
				}
			});					
		}

		bindListeners() {

			var that = this;

			// Hide dropdowns on Esc and document click
            document.addEventListener('keyup', function(event) {
                if (event.keyCode == 27) {
					that.hideDropdowns();	
				}
			});

            document.addEventListener('click', function(event) {
            	that.hideDropdowns();
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