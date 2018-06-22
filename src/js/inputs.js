import Base from './base'

const Inputs = (() => {

	class Inputs extends Base {	

	    constructor() {
	    	super();
		  	this._md_inputs = document.querySelectorAll(".form__input__group--md .form__input");
		  	if (typeof this._md_inputs !== 'undefined' && this._md_inputs) {
		  		this.setup();
			}
	    }

	    setup() {

	  		this._forEach(this._md_inputs, (index, el) => {
	  			
				if (el.value != '' && typeof el.value !== 'undefined') {
					el.parentNode.classList.add('form__input__group--has-value');
					this._forEach(el.parentNode.children, function(index, child) {
						if (child.classList.contains('form__label')) {
							child.classList.add('form__label--no-transition');
						}
					});
				}	  			

				el.addEventListener('click', (event) => {
					event.target.parentNode.classList.add('form__input__group--has-value');
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
						event.target.parentNode.classList.remove('form__input__group--has-value');
						this._forEach(el.parentNode.children, function(index, child) {
							if (child.classList.contains('form__label')) {
								child.classList.remove('form__label--no-transition');
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