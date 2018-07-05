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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
	Class: Base
	Author: Junel Mujar
	Description: Base class for all the components; includes utility methods 
	for iterating through arrays/NodeList, creating unique component ids and
	sending custom events to the window object
*/

class Base {

	constructor() {}

	/*
 	IE/Edge Iterator alternative
 	forEach method, could be shipped as part of an Object Literal/Module
 	https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
 */
	_forEach(array, callback, scope) {
		for (var i = 0; i < array.length; i++) {
			callback.call(scope, i, array[i]); // passes back stuff we need
		}
	}

	_sendEvent(action, obj) {
		window.dispatchEvent(new CustomEvent(action, { bubbles: true, detail: obj }));
	}

	// Ref: https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/
	// Get the closest parent element with a matching selector
	_getClosest(elem, selector) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				    i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
		}

		// Get the closest matching element
		for (; elem && elem !== document; elem = elem.parentNode) {
			if (elem.matches(selector)) return elem;
		}
		return null;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Base;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inputs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tooltips__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dropdowns__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__navs__ = __webpack_require__(7);







document.addEventListener("DOMContentLoaded", function () {

	function forEach(array, callback, scope) {
		for (var i = 0; i < array.length; i++) {
			callback.call(scope, i, array[i]); // passes back stuff we need
		}
	};

	new __WEBPACK_IMPORTED_MODULE_1__tooltips__["a" /* default */]();
	new __WEBPACK_IMPORTED_MODULE_0__inputs__["a" /* default */]();
	new __WEBPACK_IMPORTED_MODULE_2__tabs__["a" /* default */]();
	new __WEBPACK_IMPORTED_MODULE_3__modals__["a" /* default */]();
	new __WEBPACK_IMPORTED_MODULE_4__dropdowns__["a" /* default */]();
	new __WEBPACK_IMPORTED_MODULE_5__navs__["a" /* default */]();

	function htmlEntities(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	var code = document.querySelectorAll('code');
	code.forEach(function (el, i) {
		el.innerHTML = htmlEntities(el.innerHTML);
	});
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);


const Inputs = (() => {

	class Inputs extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {

		constructor() {
			super();
			this._inputs = document.querySelectorAll("form .field__input");
			if (typeof this._inputs !== 'undefined' && this._inputs) {
				console.log(this._inputs);
				this.setup();
			}
		}

		setup() {

			this._forEach(this._inputs, (index, el) => {

				if (el.value != '' && typeof el.value !== 'undefined') {
					el.parentNode.classList.add('field--has-value');
					this._forEach(el.parentNode.children, function (index, child) {
						if (child.classList.contains('field_label')) {
							child.classList.add('field_label--no-transition');
						}
					});
				}

				el.addEventListener('click', event => {
					event.target.parentNode.classList.add('field--has-value');
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
						event.target.parentNode.classList.remove('field--has-value');
						this._forEach(el.parentNode.children, function (index, child) {
							if (child.classList.contains('field_label')) {
								child.classList.remove('field_label--no-transition');
							}
						});
					}
				});
			});
		}
	}

	return Inputs;
})();

/* harmony default export */ __webpack_exports__["a"] = (Inputs);

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);


const Tabs = (() => {

	const Data = {
		TOGGLE: 'tab',
		TARGET: 'data-target'
	};

	class Tabs extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {

		// Initialize all found tabs
		constructor() {
			super();
			this._tabs = document.querySelectorAll('[data-toggle=' + Data.TOGGLE + ']');
			this._activeTabs = document.querySelectorAll('.tab__nav__item--active');

			if (typeof this._tabs !== 'undefined' && this._tabs) {
				this.setup();
				this.bindListeners();
			}
		}

		// Show panels if there are tab item(s) marked as active
		setup() {
			var that = this;
			this._forEach(this._activeTabs, function (index, tab) {
				that._forEach(tab.children, function (index, child) {
					var target = that.getTarget(child);
					that.showPanel(child, target);
				});
			});
		}

		// Get target panel
		getTarget(tab) {
			var target;
			var targetParts;
			if (typeof tab !== 'undefined' && tab) {
				target = tab.getAttribute(Data.TARGET);
				targetParts = target.split(":");
			}
			return targetParts;
		}

		showPanel(tabLink, target) {
			// We got valid parts
			if (target && target.length == 2) {
				var targetString = '[data-panel-id=' + target[0] + '] [data-id=' + target[1] + ']';

				tabLink.parentNode.classList.add('tab__nav__item--active');

				var targetTabPanel = document.querySelector(targetString);

				// Show found tab panel
				if (typeof targetTabPanel !== 'undefined' && targetTabPanel) {

					targetTabPanel.parentNode.classList.add('tab__content--active');

					this._forEach(targetTabPanel.parentNode.children, function (index, child) {
						if (child !== targetTabPanel) {
							child.classList.remove('tab__content__panel--active');
						}
					});

					targetTabPanel.classList.add('tab__content__panel--active');
				}
			} else {
				throw new TypeError('Tab target requires the following format and should be unique: <parent>:<id> Example: tab-dogs:german or recipes:pasta');
			}
		}

		// Remove any active state on sibling elements
		clearActive(tab) {
			if (typeof tab.parentNode.parentNode.children !== 'undefined' && tab.parentNode.parentNode.children) {
				this._forEach(tab.parentNode.parentNode.children, function (index, child) {
					child.classList.remove('tab__nav__item--active');
				});
			}
		}

		// Bind tab item click event listener
		bindListeners() {
			this._tabs.forEach((el, i) => {

				// Show our tab
				el.addEventListener('click', event => {

					event.preventDefault();

					// Clicked tab item
					var tab = event.target;

					// Clear previous or currently selected tab
					this.clearActive(tab);

					// Get target panel
					var target = this.getTarget(event.target);

					// Make current tab item active and show tab panel
					this.showPanel(tab, target);

					this._sendEvent('minui.tab.clicked', event);
				});
			});
		}

	}
	return Tabs;
})();

/* harmony default export */ __webpack_exports__["a"] = (Tabs);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);


const Modals = (() => {

    class Modals extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {

        constructor() {

            super();

            // Initial modals and triggers
            this._modals = document.querySelectorAll(".modal");
            this._modalTriggers = document.querySelectorAll("[data-toggle=modal]");
            this._modalDismissTriggers = document.querySelectorAll("[data-dismiss=modal]");

            if (typeof this._modals !== 'undefined' && this._modals) {
                this.setup();
                this.bindListeners();
            }
        }

        setup() {

            var that = this;

            // Toggle
            this._modalTriggers.forEach((el, i) => {
                el.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    var targetModalID = '[data-modal-id=' + event.target.getAttribute('data-target') + ']';
                    var targetModal = document.querySelector(targetModalID);
                    document.body.classList.add("modal--shown");
                    targetModal.classList.toggle("modal--show");
                    that._sendEvent('minui.modal.open', event);
                });
            });

            // Overlay
            this._modals.forEach((el, i) => {
                var closeOnOverlayClick = el.getAttribute('data-close-overlay');
                if (closeOnOverlayClick === 'true') {
                    el.addEventListener("click", function (event) {
                        event.preventDefault();
                        if (event.target.classList.contains('modal--show')) {
                            event.target.classList.toggle("modal--show");
                            that._sendEvent('minui.modal.overlay.dismissed', event);
                            document.body.classList.remove("modal--shown");
                        }
                    });
                }
            });

            // Dismiss triggers
            this._modalDismissTriggers.forEach((el, i) => {
                el.addEventListener("click", event => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    document.querySelector(".modal.modal--show").classList.remove('modal--show');
                    document.body.classList.remove("modal--shown");
                    that._sendEvent('minui.modal.dismissed', event);
                });
            });
        }

        bindListeners() {
            // Document listeners
            var that = this;
            document.addEventListener('keyup', function (event) {
                if (event.keyCode == 27) {
                    var activeModal = document.querySelector(".modal.modal--show");
                    if (typeof activeModal !== 'undefined' && activeModal) {
                        var closeOnEsc = activeModal.getAttribute('data-close-esc');
                        if (closeOnEsc === 'undefined' || closeOnEsc === 'true') {
                            if (typeof activeModal !== 'undefined' && activeModal) {
                                activeModal.classList.remove('modal--show');
                                document.body.classList.remove("modal--shown");
                                that._sendEvent('minui.modal.esc.dismissed', event);
                            }
                        }
                    }
                }
            });
        }
    }

    return Modals;
})();

/* harmony default export */ __webpack_exports__["a"] = (Modals);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);


const Dropdowns = (() => {

	class Dropdowns extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {

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
			ref._forEach(navItems, function (index, el) {
				if (typeof el !== 'undefined') {
					if (el.nextElementSibling) {
						el.classList.remove('nav-item__active');
						if (typeof el.children !== 'undefined') {
							ref._forEach(el.children, function (index, child) {
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
			document.addEventListener('click', event => {
				if (event.target != 'html') {
					if (event.target.classList.contains('menu') || event.target.parentNode.classList.contains('menu__html')) {
						return false;
					}
				}
				that.hideDropdowns(that);
			});

			// Document listeners
			document.addEventListener('keyup', event => {
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

			this._dropdowns.forEach(function (el, i) {

				// Show our dropdown
				el.addEventListener('click', event => {

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

							if (event.target.nextElementSibling.classList.contains('menu--center')) placement = 'bottom'; // bottom centered
							if (event.target.nextElementSibling.classList.contains('menu--right')) placement = 'bottom-end'; // bottom right

							event.target.nextElementSibling.classList.add('menu--visible');

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
										preventOverflow: {
											enabled: true
										},
										flip: {
											enabled: false
										}
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);


const Navs = (() => {

	const Data = {
		TOGGLE: '.navbar__toggle',
		SIDEBAR_TOGGLE: '.sidebar__toggle',
		LINK: '.nav__item-link'
	};

	class Navs extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {

		constructor() {

			super();

			// Initialize all found tabs
			this._toggles = document.querySelectorAll(Data.TOGGLE);
			this._sidebar_toggles = document.querySelectorAll(Data.SIDEBAR_TOGGLE);
			this._links = document.querySelectorAll(Data.LINK);
			this._activeId = '';
			this._fixedNav = document.querySelector('.navbar--fixed-top');

			if (typeof this._toggles !== 'undefined' && this._toggles) {
				this.setup();
				this.bindListeners();
			}
		}

		setup() {

			var that = this;
			// Nav
			this._forEach(this._toggles, function (index, toggle) {
				toggle.addEventListener('click', function (event) {
					event.preventDefault();
					event.stopPropagation();
					var targetId = event.target.getAttribute('data-id');
					var target = document.querySelector(`[for='${targetId}'`);
					target.classList.toggle('nav--collapsed');
				});
			});

			// Sidebars
			this._forEach(this._sidebar_toggles, function (index, sidebar_toggle) {
				sidebar_toggle.addEventListener('click', function (event) {
					event.preventDefault();
					event.stopPropagation();
					var targetId = event.target.getAttribute('data-id');
					var target = document.querySelector(`[for='${targetId}'`);
					target.classList.toggle('layout__sidebar-open');
				});
			});

			// Dropdown
			this._forEach(this._links, function (index, link) {
				link.addEventListener('click', function (event) {
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
			this._forEach(dropdowns, function (index, dropdown) {
				var dropdownId = dropdown.getAttribute('for');
				if (dropdownId != that._activeId) {
					dropdown.classList.remove('nav__item-menu--visible');
				}
			});
		}

		bindListeners() {
			var that = this;
			document.addEventListener('click', function (event) {
				var dropdowns = document.querySelectorAll('.nav__item-menu--visible');
				that._forEach(dropdowns, function (index, dropdown) {
					dropdown.classList.remove('nav__item-menu--visible');
				});
			});
			document.addEventListener('keyup', function (event) {
				if (event.keyCode == 27) {
					var navs = document.querySelectorAll('.nav--collapsible');
					that._forEach(navs, function (index, nav) {
						nav.classList.add('nav--collapsed');
					});
					var dropdowns = document.querySelectorAll('.nav__item-menu--visible');
					that._forEach(dropdowns, function (index, dropdown) {
						dropdown.classList.remove('nav__item-menu--visible');
					});
				}
			});
			window.addEventListener('resize', function (event) {
				var dropdowns = document.querySelectorAll('.nav__item-menu--visible');
				that._forEach(dropdowns, function (index, dropdown) {
					dropdown.classList.remove('nav__item-menu--visible');
				});
				if (window.width < 992) {
					console.log('oi');
				}
			});
			window.addEventListener('scroll', function (e) {
				if (window.scrollY > 65) {
					that._fixedNav.setAttribute('style', 'box-shadow: 0 0px 30px 5px rgba(0,0,0,0.35);');
				} else {
					that._fixedNav.removeAttribute('style');
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