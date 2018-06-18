document.addEventListener("DOMContentLoaded", () => {

	// Initialize found tooltips
	var tooltips = document.querySelectorAll('[data-toggle=tooltip]');
  	if (typeof tooltips !== 'undefined' && tooltips) {
	  	
  		tooltips.forEach((el, i) => {
	  		var tooltip_text = el.getAttribute('data-tooltip');
	  		if (tooltip_text) {
		        if (typeof Tooltip === 'undefined') {
		          	throw new TypeError('Minui dropdown require Tooltip.js (https://popper.js.org)')
		        } else {		  			
				  	var instance = new Tooltip(el, {
					    title: tooltip_text,
					    trigger: "hover",
					    offset: '0, 10',
					    html: true
				  	});
				}
		  	}
  		});

  	}

  	var inputs   = document.querySelectorAll(".input-md input, .input-md textarea, .input-md select");
  	if (typeof inputs !== 'undefined' && inputs) {

  		inputs.forEach((el, index) => {
  			
			if (el.value != '' && typeof el.value !== 'undefined') {
				el.parentNode.classList.add('focused');

				for (var child of el.parentNode.children) {
					var siblingType = child.tagName.toLowerCase();
					if (child !== el && child == 'label') {
						child.classList.add('no-transition');
					}
				}
			}	  			

			el.addEventListener('click', (event) => {
				event.target.parentNode.classList.add('focused');
			});

			el.addEventListener('blur', (event) => {
				
				var elType  = el.tagName.toLowerCase();
				var elValue = '';

				switch (elType) {
					case 'select':
						elValue = event.target.options[event.target.selectedIndex].value;
					break;
					default:
						elValue = event.target.value;
					break;
				}
				
				if (elValue == '' || typeof elValue == 'undefined') {
					event.target.parentNode.classList.remove('focused');
					for (var child of el.parentNode.children) {
						var siblingType = child.tagName.toLowerCase();
						if (child !== event.target && child == 'label') {
							child.classList.remove('no-transition');
						}
					}
				}

			});				
  		});

	}


	// Document listeners
	document.addEventListener('click', function(event) {

		// Dropdowns: Close all visible dropdowns if there's any
	    var dropdowns = document.querySelectorAll('[data-toggle=dropdown]');
		dropdowns.forEach((p, index) => {
	    	if (p.nextElementSibling.classList.contains('dropdown-menu')) {
	    		if (p.nextElementSibling.classList.contains('visible')) {
					p.nextElementSibling.classList.remove('visible');
				}
	    	}
		});

	});


	// Document listeners
	document.addEventListener('keyup', function(event) {

		// Dropdowns: Close all visible dropdowns if there's any
		if (event.keyCode == 27) {
		    var dropdowns = document.querySelectorAll('[data-toggle=dropdown]');

		    if (typeof dropdowns !== 'undefined' && dropdowns) {
				dropdowns.forEach((p, index) => {
			    	if (p.nextElementSibling.classList.contains('dropdown-menu')) {
			    		if (p.nextElementSibling.classList.contains('visible')) {
							p.nextElementSibling.classList.remove('visible');
						}
			    	}
				});
			}

			var activeModal = document.querySelector(".modal.show-modal");
			if (typeof activeModal !== 'undefined' && activeModal) {
				activeModal.classList.remove('show-modal');
				document.body.classList.remove("modal-shown");
			}
		}

	});

	// Initialize all found dropdowns
	var dropdowns = document.querySelectorAll('[data-toggle=dropdown]');

	if (typeof dropdowns !== 'undefined') {
		dropdowns.forEach(function(el, i) {

			// Show our dropdown
			el.addEventListener('click', (event) => {
			
				event.preventDefault();
				event.stopPropagation();

				// Close all other open 
				dropdowns.forEach((dropdown, i) => {
					if (dropdown != el) {
				    	if (dropdown.nextElementSibling.classList.contains('dropdown-menu')) {
				    		if (dropdown.nextElementSibling.classList.contains('visible')) {
								dropdown.nextElementSibling.classList.remove('visible');
							}
				    	}
			    	}
				});

				// Toggle visibility
				if (event.target.nextElementSibling.classList.contains('dropdown-menu')) {

					if (event.target.nextElementSibling.classList.contains('visible')) {
						event.target.nextElementSibling.classList.remove('visible');
					} else {
						
						var placement = 'bottom-start'; // bottom left
						
						if (event.target.nextElementSibling.classList.contains('center')) 	placement = 'bottom'; 		// bottom centered
						if (event.target.nextElementSibling.classList.contains('right')) 	placement = 'bottom-end'; 	// bottom right

						event.target.nextElementSibling.classList.add('visible');

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


	// Initialize all found tabs
	var tabs = document.querySelectorAll('[data-toggle=tab]');

	if (typeof tabs !== 'undefined' && tabs) {
		tabs.forEach(function(el, i) {

			// Show our tab
			el.addEventListener('click', (event) => {

				event.preventDefault();

				tabs.forEach((tabItem, index) => {
			    	tabItem.parentNode.classList.remove('active');
				});

				var targetTabPanelID = event.target.getAttribute('href');

				event.target.parentNode.classList.add('active');

				var targetTabPanel = document.querySelector(targetTabPanelID);

				// Show found tab panel
				if (typeof targetTabPanel !== 'undefined' && targetTabPanel) {
					for (var child of targetTabPanel.parentNode.children) {
						var siblingType = child.tagName.toLowerCase();
						if (child !== targetTabPanel) {
							child.classList.remove('active');
						}						
					}
						
					targetTabPanel.classList.add('active');
				}

			});
		});
	}


	// Initial modals and triggers
	var modals               = document.querySelectorAll(".modal");
	var modalTriggers        = document.querySelectorAll("[data-toggle=modal]");
	var modalDismissTriggers = document.querySelectorAll("[data-dismiss=modal]");

    const toggleModal = (event) => {
    	event.stopPropagation();
		var targetModalID = '[data-modal-id='+event.target.getAttribute('data-target')+']';
		var targetModal   = document.querySelector(targetModalID);
		document.body.classList.add("modal-shown");
		targetModal.classList.toggle("show-modal");
    }

    const modalOverlayClick = (event) => {
    	if (event.target.classList.contains('show-modal')) {
    		event.target.classList.toggle("show-modal");
    	}
   		document.body.classList.remove("modal-shown");
    }

    modalTriggers.forEach((el, i) => {
    	el.addEventListener("click", toggleModal);
    });

    modals.forEach((el, i) => {
    	el.addEventListener("click", modalOverlayClick);
    });

    modalDismissTriggers.forEach((el, i) => {
    	el.addEventListener("click", () => {
    		document.querySelector(".modal.show-modal").classList.remove('show-modal');
    		document.body.classList.remove("modal-shown");
    	});
    });
});