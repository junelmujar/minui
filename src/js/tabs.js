const Tabs = (() => {

	const Data = {
		TOGGLE: 'tab',
		TARGET: 'href'
	}

	class Tabs {	

		// Initialize all found tabs
	    constructor() {
			this._tabs = document.querySelectorAll('[data-toggle='+Data.TOGGLE+']');
			this._activeTabs = document.querySelectorAll('.tab__nav__item--active');
			if (typeof this._tabs !== 'undefined' && this._tabs) {
				this.setup();
				this.bindListeners();
			}
		}

		// Show panels if there are tab item(s) marked as active
		setup() {
			var that = this;
			this._activeTabs.forEach(function(el, i) {
				if (typeof el.children !== 'undefined' && el.children) {
					for (var child of el.children) {
						var target  = that.getTarget(child);
						that.showPanel(child, target);
					}
				}
			});
		}	

        _sendEvent(action, obj) {
            document.dispatchEvent(new CustomEvent(action, { bubbles: true, detail: obj }));               
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
				var targetString = '[data-panel-id='+target[0]+'] [data-id='+target[1]+']';

				tabLink.parentNode.classList.add('tab__nav__item--active');

				var targetTabPanel = document.querySelector(targetString);

				// Show found tab panel
				if (typeof targetTabPanel !== 'undefined' && targetTabPanel) {

					targetTabPanel.parentNode.classList.add('tab__content--active');

					for (var child of targetTabPanel.parentNode.children) {
						var siblingType = child.tagName.toLowerCase();
						if (child !== targetTabPanel) {
							child.classList.remove('tab__content__panel--active');
						}						
					}
						
					targetTabPanel.classList.add('tab__content__panel--active');
				}
			} else {
				throw new TypeError('Tab target requires the following format and should be unique: <parent>:<id> Example: tab-dogs:german or recipes:pasta');
			}
		}

		// Remove any active state on sibling elements
		clearActive(tab) {
			if (typeof tab.parentNode.parentNode.children !== 'undefined' 
				&& tab.parentNode.parentNode.children) {
				for (var child of tab.parentNode.parentNode.children) {
			    	child.classList.remove('tab__nav__item--active');
				}
			}
		}

		// Bind tab item click event listener
		bindListeners() {
			var that = this;
			this._tabs.forEach(function(el, i) {

				// Show our tab
				el.addEventListener('click', (event) => {

					event.preventDefault();

					// Clicked tab item
					var tab = event.target;

					// Clear previous or currently selected tab
					that.clearActive(tab);

					// Get target panel
					var target = that.getTarget(event.target);

					// Make current tab item active and show tab panel
					that.showPanel(tab, target);

					that._sendEvent('minui.tab.clicked', event);

				});
			});		
		}

	}
	return Tabs;
})();

export default Tabs;