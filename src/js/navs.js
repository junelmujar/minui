const Navs = (() => {

	const Data = {
		TOGGLE: 'nav',
		TARGET: 'href',
		SELECTOR: '.nav, nav',
		DROPDOWN: 'dropdown',
		LINK: '.nav-item-link'
	}

	class Navs {	

	    constructor() {
			// Initialize all found tabs
			this._navs      = document.querySelectorAll('[data-toggle='+Data.TOGGLE+']');
			this._dropdowns = document.querySelectorAll('[data-toggle='+Data.DROPDOWN+']');
			this._links     = document.querySelectorAll(Data.LINK);
			if (typeof this._navs !== 'undefined' && this._navs) {
				this.setup();
				this.bindListeners();
			}
		}

		setup() {
			var that = this;
			this._navs.forEach(function(el, i) {
				el.addEventListener('click', function(event) {
					event.preventDefault();
					var targetNavID = this.getAttribute(Data.TARGET);
					var targetNav = document.querySelector(targetNavID);

					event.target.classList.toggle('nav-item__active');
					targetNav.classList.toggle('nav-items__open');
				});
			});		
			this._links.forEach(function(el, i) {
				el.addEventListener('click', function(event) {
					event.preventDefault();

					var navItems = document.querySelectorAll('.nav-item');
					navItems.forEach(function(el, i) {
						if (typeof el !== 'undefined') {
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
					});

					var targetDropdownID = this.getAttribute('href');
					event.target.parentNode.classList.toggle('nav-item__active');
					if (el.nextElementSibling) {
						el.nextElementSibling.classList.toggle('dropdown__visible');
					}
		
				});
			});				
		}	

		hideDropdowns() {
			var navItems = document.querySelectorAll('.nav-item');
			navItems.forEach(function(el, i) {
				if (typeof el !== 'undefined') {
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
			});					
		}

		bindListeners() {

			var that = this;
            document.addEventListener('keyup', function(event) {
                if (event.keyCode == 27) {
					that.hideDropdowns();	
				}
			});

            document.addEventListener('click', function(event) {
            	that.hideDropdowns();
			});

			var togglers = document.querySelectorAll('[data-toggle='+Data.TOGGLE+']');
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