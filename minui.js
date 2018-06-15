document.addEventListener("DOMContentLoaded", function(){

		// Initialize found tooltips
		var tooltips = document.querySelectorAll('[data-toggle=tooltip]');
	  	if (typeof tooltips !== 'undefined') {
		  	
		  	Array.prototype.forEach.call(tooltips, function(el, i) {
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
	  	if (typeof inputs !== 'undefined') {

	  		Array.prototype.forEach.call(inputs, function(el, index) {
	  			
				if (el.value != '' && typeof el.value !== 'undefined') {
					el.parentNode.classList.add('focused');
					Array.prototype.filter.call(el.parentNode.children, function(child){
						var siblingType = child.tagName.toLowerCase();
						if (child !== el && child == 'label') {
							child.classList.add('no-transition');
						}
					});
				}	  			

				el.addEventListener('click', function(event) {
					this.parentNode.classList.add('focused');
				});

				el.addEventListener('blur', function(event) {
					
					var elType  = el.tagName.toLowerCase();
					var elValue = '';

					switch (elType) {
						case 'select':
							elValue = this.options[this.selectedIndex].value;
						break;
						default:
							elValue = this.value;
						break;
					}
					
					if (elValue == '' || typeof elValue == 'undefined') {
						this.parentNode.classList.remove('focused');
						Array.prototype.filter.call(this.parentNode.children, function(child){
							var siblingType = child.tagName.toLowerCase();
							if (child !== this && child == 'label') {
								child.classList.remove('no-transition');
							}
						});						
					}
				});				
	  		});

		}


		// Document listeners
		document.addEventListener('click', function(event) {

			// Dropdowns: Close all visible dropdowns if there's any
		    var dropdowns = document.querySelectorAll('[data-toggle=dropdown]');
			Array.prototype.forEach.call(dropdowns, function(p, index) {
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
				Array.prototype.forEach.call(dropdowns, function(p, index) {
			    	if (p.nextElementSibling.classList.contains('dropdown-menu')) {
			    		if (p.nextElementSibling.classList.contains('visible')) {
							p.nextElementSibling.classList.remove('visible');
						}
			    	}
				});

				document.querySelector(".modal.show-modal").classList.remove('show-modal');
			}

		});

		// Initialize all found dropdowns
		var dropdowns = document.querySelectorAll('[data-toggle=dropdown]');

		if (typeof dropdowns !== 'undefined') {
			Array.prototype.forEach.call(dropdowns, function(el, i) {

				// Show our dropdown
				el.addEventListener('click', function(event) {
				
					event.preventDefault();
					event.stopPropagation();

					// Close all other open 
					Array.prototype.forEach.call(dropdowns, function(p, index) {
						if (p != el) {
					    	if (p.nextElementSibling.classList.contains('dropdown-menu')) {
					    		if (p.nextElementSibling.classList.contains('visible')) {
									p.nextElementSibling.classList.remove('visible');
								}
					    	}
				    	}
					});

					// Toggle visibility
					if (this.nextElementSibling.classList.contains('dropdown-menu')) {

						if (this.nextElementSibling.classList.contains('visible')) {
							this.nextElementSibling.classList.remove('visible');
						} else {
							
							var placement = 'bottom-start'; // bottom left
							
							if (this.nextElementSibling.classList.contains('center')) 	placement = 'bottom'; 		// bottom centered
							if (this.nextElementSibling.classList.contains('right')) 	placement = 'bottom-end'; 	// bottom right

							this.nextElementSibling.classList.add('visible');

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
								new Popper(this, this.nextElementSibling, Default);
							}
						}
					}
				});
			});
		}


		// Initialize all found tabs
		var tabs = document.querySelectorAll('[data-toggle=tab]');

		if (typeof tabs !== 'undefined') {
			Array.prototype.forEach.call(tabs, function(el, i) {

				// Show our tab
				el.addEventListener('click', function(event) {

					event.preventDefault();

					Array.prototype.forEach.call(tabs, function(tabItem, index) {
				    	tabItem.parentNode.classList.remove('active');
					});

					var targetTabPanelID = this.getAttribute('href');

					this.parentNode.classList.add('active');

					var targetTabPanel = document.querySelector(targetTabPanelID);

					// Show found tab panel
					if (typeof targetTabPanel !== 'undefined') {
						Array.prototype.filter.call(targetTabPanel.parentNode.children, function(child){
							var siblingType = child.tagName.toLowerCase();
							if (child !== targetTabPanel) {
								child.classList.remove('active');
							}
						});								
						targetTabPanel.classList.add('active');
					}

				});
			});
		}


		// Initial modals and triggers
		var modals               = document.querySelectorAll(".modal");
		var modalTriggers        = document.querySelectorAll("[data-toggle=modal]");
		var modalDismissTriggers = document.querySelectorAll("[data-dismiss=modal]");

	    function toggleModal(event) {
	    	event.stopPropagation();
			var targetModalID = '[data-modal-id='+this.getAttribute('data-target')+']';
			var targetModal   = document.querySelector(targetModalID);
			document.body.classList.add("modal-shown");
			targetModal.classList.toggle("show-modal");
	    }

	    function modalOverlayClick(event) {
	    	if (event.target.classList.contains('show-modal')) {
	    		event.target.classList.toggle("show-modal");
	    	}
	    }

	    Array.prototype.forEach.call(modalTriggers, function(el, i) {
	    	el.addEventListener("click", toggleModal);
	    });

	    Array.prototype.forEach.call(modals, function(el, i) {
	    	el.addEventListener("click", modalOverlayClick);
	    });

	    Array.prototype.forEach.call(modalDismissTriggers, function(el, i) {
	    	el.addEventListener("click", function() {
	    		document.querySelector(".modal.show-modal").classList.remove('show-modal');
	    		document.body.classList.remove("modal-shown");
	    	});
	    });
});