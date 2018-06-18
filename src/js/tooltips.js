const Tooltips = (() => {

	const Data = {
		TOGGLE: 'tooltip',
		TOOLTIP: 'data-tooltip'
	}

	class Tooltips {	

	    constructor() {
			// Initialize found tooltips
			this._tooltips = document.querySelectorAll('[data-toggle='+Data.TOGGLE+']');
		  	if (typeof this._tooltips !== 'undefined' && this._tooltips) {
		  		this.setup();
		  	}
	    }

	    setup() {
	  		this._tooltips.forEach((el, i) => {
		  		var tooltipText = el.getAttribute(Data.TOOLTIP);
		  		if (tooltipText) {
			        if (typeof Tooltip === 'undefined') {
			          	throw new TypeError('Minui dropdown require Tooltip.js (https://popper.js.org)')
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

  	return Tooltips
})()

export default Tooltips;