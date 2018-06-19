const Tabs = (() => {

	const Data = {
		TOGGLE: 'tab',
		TARGET: 'href'
	}

	class Tabs {	

	    constructor() {
			// Initialize all found tabs
			this._tabs = document.querySelectorAll('[data-toggle='+Data.TOGGLE+']');
			if (typeof this._tabs !== 'undefined' && this._tabs) {
				this.setup();
			}
		}

		setup() {
			var that = this;

			this._tabs.forEach(function(el, i) {

				// Show our tab
				el.addEventListener('click', (event) => {

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

export default Tabs;