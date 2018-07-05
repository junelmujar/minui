import Base from './base'

const Dropdowns = (() => {
	
	class Dropdowns extends Base {	

	    constructor() {

	    	super();

			// Initialize all found dropdowns
			this._dropdowns = document.querySelectorAll('[data-toggle=dropdown]');

			if (typeof this._dropdowns !== 'undefined') {
				this.setup();
				this.bindListeners();
			}

		}

		hideDropdowns(ref) {
			// Dropdowns: Close all visible dropdowns if there's any
			ref._forEach(ref._dropdowns, (index, p) => {
		    	if (p.nextElementSibling.classList.contains('menu')) {
		    		if (p.nextElementSibling.classList.contains('menu--visible')) {
						p.nextElementSibling.classList.remove('menu--visible');
					}
		    	}
			});
		}

		hideNavMenus(ref) {
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

			// Document listeners
			document.addEventListener('click', (event) => {
				if (event.target != 'html') {
					if (event.target.classList.contains('menu') ||
						event.target.parentNode.classList.contains('menu__html')) {
						return false;
					}
				}
				that.hideDropdowns(that);
			});

			// Document listeners
			document.addEventListener('keyup', (event) => {
				// Dropdowns: Close all visible dropdowns if there's any
				if (event.keyCode == 27) {
				    if (typeof that._dropdowns !== 'undefined' && that._dropdowns) {
						this.hideDropdowns(that);
					}
				}
			});		
		}

		setup() {

			var that = this;

			this._dropdowns.forEach(function(el, i) {

				// Show our dropdown
				el.addEventListener('click', (event) => {
				
					event.preventDefault();
					event.stopPropagation();

					// Close all other open 
					that._forEach(that._dropdowns, (index, dropdown) => {
						if (dropdown != el) {
					    	if (dropdown.nextElementSibling.classList.contains('menu')) {
					    		if (dropdown.nextElementSibling.classList.contains('menu--visible')) {
									dropdown.nextElementSibling.classList.remove('menu--visible');
								}
					    	}
				    	}
					});
				
					// Hide nav menus if there's any
					that.hideNavMenus(that);

					// Toggle visibility
					if (event.target.nextElementSibling.classList.contains('menu')) {

						if (event.target.nextElementSibling.classList.contains('menu--visible')) {
							event.target.nextElementSibling.classList.remove('menu--visible');
						} else {
							
							var placement = 'bottom-start'; // bottom left
							
							if (event.target.nextElementSibling.classList.contains('menu--center')) 	placement = 'bottom'; 		// bottom centered
							if (event.target.nextElementSibling.classList.contains('menu--right')) 	placement = 'bottom-end'; 	// bottom right

							event.target.nextElementSibling.classList.add('menu--visible');

					        /**
					         * Check for Popper dependency
					         * Popper - https://popper.js.org
					         */
					        if (typeof Popper === 'undefined') {
					          	throw new TypeError('Minui dropdown require Popper.js (https://popper.js.org)')
					        } else {
								const Default = {
									placement: placement,
									modifiers: {
										preventOverflow: { 
											enabled: true 
										},
										flip : {
											enabled: false
										}
									}
								}												        	
								// Create the popper object and perform placement
								new Popper(event.target, event.target.nextElementSibling, Default);
							}
						}
					}
				});
			});		
		}

	}

	return Dropdowns;
})()

export default Dropdowns;