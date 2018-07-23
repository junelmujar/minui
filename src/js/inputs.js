import Base from './base'

const Inputs = (() => {

	class Inputs extends Base {	

	    constructor() {
	    	super();
		  	this._inputs = document.querySelectorAll("form .field__input");
		  	if (typeof this._inputs !== 'undefined' && this._inputs) {
		  		this.setup();
			}
	    }

	    setup() {

	  		this._forEach(this._inputs, (index, el) => {
	  			
				if (el.value != '' && typeof el.value !== 'undefined') {
					el.parentNode.classList.add('field--has-value');
					this._forEach(el.parentNode.children, function(index, child) {
						if (child.classList.contains('field_label')) {
							child.classList.add('field_label--no-transition');
						}
					});
				}	  			

				el.addEventListener('click', (event) => {
					event.target.parentNode.classList.add('field--has-value');
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
						event.target.parentNode.classList.remove('field--has-value');
						this._forEach(el.parentNode.children, function(index, child) {
							if (child.classList.contains('field_label')) {
								child.classList.remove('field_label--no-transition');
							}							
						});
					}

				});				
	  		});	    
	  			
	    }
	}

  	return Inputs
})()

export default Inputs;