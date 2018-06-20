(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["minui"] = factory();
	else
		root["minui"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inputs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tooltips__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dropdowns__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__navs__ = __webpack_require__(6);







new __WEBPACK_IMPORTED_MODULE_1__tooltips__["a" /* default */]();
new __WEBPACK_IMPORTED_MODULE_0__inputs__["a" /* default */]();
new __WEBPACK_IMPORTED_MODULE_2__tabs__["a" /* default */]();
new __WEBPACK_IMPORTED_MODULE_3__modals__["a" /* default */]();
new __WEBPACK_IMPORTED_MODULE_4__dropdowns__["a" /* default */]();
new __WEBPACK_IMPORTED_MODULE_5__navs__["a" /* default */]();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Inputs = (() => {

	class Inputs {
		constructor() {

			this._inputs = document.querySelectorAll(".input-md input, .input-md textarea, .input-md select");

			if (typeof this._inputs !== 'undefined' && this._inputs) {
				this.setup();
			}
		}

		setup() {

			this._inputs.forEach((el, index) => {

				if (el.value != '' && typeof el.value !== 'undefined') {
					el.parentNode.classList.add('focused');

					for (var child of el.parentNode.children) {
						var siblingType = child.tagName.toLowerCase();
						if (child !== el && child == 'label') {
							child.classList.add('no-transition');
						}
					}
				}

				el.addEventListener('click', event => {
					event.target.parentNode.classList.add('focused');
				});

				el.addEventListener('blur', event => {

					var elType = el.tagName.toLowerCase();
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
	}

	return Inputs;
})();

/* harmony default export */ __webpack_exports__["a"] = (Inputs);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Tooltips = (() => {

	const Data = {
		TOGGLE: 'tooltip',
		TOOLTIP: 'data-tooltip'
	};

	class Tooltips {

		constructor() {
			// Initialize found tooltips
			this._tooltips = document.querySelectorAll('[data-toggle=' + Data.TOGGLE + ']');
			if (typeof this._tooltips !== 'undefined' && this._tooltips) {
				this.setup();
			}
		}

		setup() {
			this._tooltips.forEach((el, i) => {
				var tooltipText = el.getAttribute(Data.TOOLTIP);
				if (tooltipText) {
					if (typeof Tooltip === 'undefined') {
						throw new TypeError('Minui dropdown require Tooltip.js (https://popper.js.org)');
					} else {
						var instance = new Tooltip(el, {
							title: tooltipText,
							trigger: "hover",
							offset: '0, 10',
							html: true
						});
					}
				}
			});
		}
	}

	return Tooltips;
})();

/* harmony default export */ __webpack_exports__["a"] = (Tooltips);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Tabs = (() => {

	const Data = {
		TOGGLE: 'tab',
		TARGET: 'href'
	};

	class Tabs {

		constructor() {
			// Initialize all found tabs
			this._tabs = document.querySelectorAll('[data-toggle=' + Data.TOGGLE + ']');
			if (typeof this._tabs !== 'undefined' && this._tabs) {
				this.setup();
			}
		}

		setup() {
			var that = this;

			this._tabs.forEach(function (el, i) {

				// Show our tab
				el.addEventListener('click', event => {

					event.preventDefault();

					that._tabs.forEach((tabItem, index) => {
						tabItem.parentNode.classList.remove('tab-item__active');
					});

					var targetTabPanelID = event.target.getAttribute(Data.TARGET);

					event.target.parentNode.classList.add('tab-item__active');

					var targetTabPanel = document.querySelector(targetTabPanelID);

					// Show found tab panel
					if (typeof targetTabPanel !== 'undefined' && targetTabPanel) {
						for (var child of targetTabPanel.parentNode.children) {
							var siblingType = child.tagName.toLowerCase();
							if (child !== targetTabPanel) {
								child.classList.remove('tab-panel__active');
							}
						}

						targetTabPanel.classList.add('tab-panel__active');
					}
				});
			});
		}

	}
	return Tabs;
})();

/* harmony default export */ __webpack_exports__["a"] = (Tabs);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Modals = (() => {
    class Modals {

        constructor() {

            // Initial modals and triggers
            this._modals = document.querySelectorAll(".modal");
            this._modalTriggers = document.querySelectorAll("[data-toggle=modal]");
            this._modalDismissTriggers = document.querySelectorAll("[data-dismiss=modal]");

            if (typeof this._modals !== 'undefined' && this._modals) {
                this.setup();
                this.bindListeners();
            }
        }

        toggleModal(event) {
            event.stopPropagation();
            var targetModalID = '[data-modal-id=' + event.target.getAttribute('data-target') + ']';
            var targetModal = document.querySelector(targetModalID);
            document.body.classList.add("modal-shown");
            targetModal.classList.toggle("show-modal");
        }

        modalOverlayClick(event) {
            if (event.target.classList.contains('show-modal')) {
                event.target.classList.toggle("show-modal");
            }
            document.body.classList.remove("modal-shown");
        }

        setup() {

            this._modalTriggers.forEach((el, i) => {
                el.addEventListener("click", this.toggleModal);
            });

            this._modals.forEach((el, i) => {
                el.addEventListener("click", this.modalOverlayClick);
            });

            this._modalDismissTriggers.forEach((el, i) => {
                el.addEventListener("click", event => {
                    event.preventDefault();
                    document.querySelector(".modal.show-modal").classList.remove('show-modal');
                    document.body.classList.remove("modal-shown");
                });
            });
        }

        bindListeners() {

            // Document listeners
            document.addEventListener('keyup', function (event) {
                if (event.keyCode == 27) {
                    var activeModal = document.querySelector(".modal.show-modal");
                    if (typeof activeModal !== 'undefined' && activeModal) {
                        activeModal.classList.remove('show-modal');
                        document.body.classList.remove("modal-shown");
                    }
                }
            });
        }
    }

    return Modals;
})();

/* harmony default export */ __webpack_exports__["a"] = (Modals);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Dropdowns = (() => {

	class Dropdowns {

		constructor() {

			// Initialize all found dropdowns
			this._dropdowns = document.querySelectorAll('[data-toggle=dropdown]');

			if (typeof this._dropdowns !== 'undefined') {
				this.setup();
				this.bindListeners();
			}
		}

		bindListeners() {

			var that = this;

			// Document listeners
			document.addEventListener('click', function (event) {

				// Dropdowns: Close all visible dropdowns if there's any
				that._dropdowns.forEach((p, index) => {
					if (p.nextElementSibling.classList.contains('dropdown-menu')) {
						if (p.nextElementSibling.classList.contains('dropdown-menu__visible')) {
							p.nextElementSibling.classList.remove('dropdown-menu__visible');
						}
					}
				});
			});

			// Document listeners
			document.addEventListener('keyup', function (event) {
				// Dropdowns: Close all visible dropdowns if there's any
				if (event.keyCode == 27) {
					if (typeof that._dropdowns !== 'undefined' && that._dropdowns) {
						that._dropdowns.forEach((p, index) => {
							if (p.nextElementSibling.classList.contains('dropdown-menu')) {
								if (p.nextElementSibling.classList.contains('dropdown-menu__visible')) {
									p.nextElementSibling.classList.remove('dropdown-menu__visible');
								}
							}
						});
					}
				}
			});
		}

		setup() {

			var that = this;

			this._dropdowns.forEach(function (el, i) {

				// Show our dropdown
				el.addEventListener('click', event => {

					event.preventDefault();
					event.stopPropagation();

					// Close all other open 
					that._dropdowns.forEach((dropdown, i) => {
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

							if (event.target.nextElementSibling.classList.contains('center')) placement = 'bottom'; // bottom centered
							if (event.target.nextElementSibling.classList.contains('right')) placement = 'bottom-end'; // bottom right

							event.target.nextElementSibling.classList.add('dropdown-menu__visible');

							/**
        * Check for Popper dependency
        * Popper - https://popper.js.org
        */
							if (typeof Popper === 'undefined') {
								throw new TypeError('Minui dropdown require Popper.js (https://popper.js.org)');
							} else {
								const Default = {
									placement: placement,
									modifiers: {
										preventOverflow: { enabled: true }
									}
									// Create the popper object and perform placement
								};new Popper(event.target, event.target.nextElementSibling, Default);
							}
						}
					}
				});
			});
		}

	}

	return Dropdowns;
})();

/* harmony default export */ __webpack_exports__["a"] = (Dropdowns);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Navs = (() => {

	const Data = {
		TOGGLE: '[data-toggle=nav]',
		LINK: '.nav-item-link'
	};

	class Navs {

		constructor() {
			// Initialize all found tabs
			this._toggles = document.querySelectorAll(Data.TOGGLE);
			this._links = document.querySelectorAll(Data.LINK);

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
			this._toggles.forEach(function (el, i) {
				el.addEventListener('click', function (event) {
					event.preventDefault();
					var targetNavID = this.getAttribute('href');
					var targetNav = document.querySelector(targetNavID);
					event.target.classList.toggle('nav-item__active');
					targetNav.classList.toggle('nav-items__open');
				});
			});

			// Links
			var ctr = 1;
			this._links.forEach(function (el, i) {

				var id = that._id();
				el.parentNode.setAttribute('_id', id);
				if (el.parentNode.classList.contains('nav-item__active')) {
					that.activeId = id;
				}

				el.addEventListener('click', function (event) {

					// Get current active nav item
					var previous = document.querySelector('[_id=' + that.activeId + ']');

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
			navItems.forEach(function (el, i) {
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
			document.addEventListener('keyup', function (event) {
				if (event.keyCode == 27) {
					that.hideDropdowns();
				}
			});

			document.addEventListener('click', function (event) {
				that.hideDropdowns();
			});

			// Mobile
			var togglers = document.querySelectorAll(Data.TOGGLE);
			if (window.outerWidth <= 768) {
				togglers.forEach(function (el, i) {
					el.parentNode.classList.add('nav__collapsed');
					el.nextElementSibling.classList.remove('nav-items__open');
				});
			} else {
				togglers.forEach(function (el, i) {
					el.parentNode.classList.remove('nav__collapsed');
				});
			}

			window.addEventListener('resize', function (event) {
				if (typeof event.target !== undefined) {
					if (event.target.outerWidth <= 768) {
						togglers.forEach(function (el, i) {
							el.parentNode.classList.add('nav__collapsed');
							el.nextElementSibling.classList.remove('nav-items__open');
						});
					} else {
						togglers.forEach(function (el, i) {
							el.parentNode.classList.remove('nav__collapsed');
						});
					}
				}
			});
		}

	}

	return Navs;
})();

/* harmony default export */ __webpack_exports__["a"] = (Navs);

/***/ })
/******/ ]);
});