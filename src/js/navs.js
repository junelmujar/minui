const Navs = (() => {

	const Data = {
		TOGGLE: 'nav',
		TARGET: 'href',
		SELECTOR: '.nav, nav'
	}

	class Navs {	

	    constructor() {
			// Initialize all found tabs
			this._navs = document.querySelectorAll('[data-toggle='+Data.TOGGLE+']');
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
					event.target.classList.toggle('nav-item__toggled');
					targetNav.classList.toggle('nav-items__open');
				});
			});		
		}	

		bindListeners() {

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