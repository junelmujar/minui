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
	}

  	return Inputs
})()

export default Inputs;