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
		    	if (p.nextElementSibling.classList.contains('dropdown-menu')) {
		    		if (p.nextElementSibling.classList.contains('dropdown-menu__visible')) {
						p.nextElementSibling.classList.remove('dropdown-menu__visible');
					}
		    	}
			});
		}

		bindListeners() {

			var that = this;

			// Document listeners
			document.addEventListener('click', (event) => {
				this.hideDropdowns(that);
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
					    	if (dropdown.nextElementSibling.classList.contains('dropdown-menu')) {
					    		if (dropdown.nextElementSibling.classList.contains('dropdown-menu__visible')) {
									dropdown.nextElementSibling.classList.remove('dropdown-menu__visible');
								}
					    	}
				    	}
					});

					// Toggle visibility
					if (event.target.nextElementSibling.classList.contains('dropdown-menu')) {

						if (event.target.nextElementSibling.classList.contains('dropdown-menu__visible')) {
							event.target.nextElementSibling.classList.remove('dropdown-menu__visible');
						} else {
							
							var placement = 'bottom-start'; // bottom left
							
							if (event.target.nextElementSibling.classList.contains('center')) 	placement = 'bottom'; 		// bottom centered
							if (event.target.nextElementSibling.classList.contains('right')) 	placement = 'bottom-end'; 	// bottom right

							event.target.nextElementSibling.classList.add('dropdown-menu__visible');

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
										preventOverflow: { enabled: true }
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