import Base from './base'

const Modals = (() => {

    class Modals extends Base {    

        constructor() {
            super();
            
        	// Initial modals and triggers
        	this._modals               = document.querySelectorAll(".modal");
        	this._modalTriggers        = document.querySelectorAll("[data-toggle=modal]");
        	this._modalDismissTriggers = document.querySelectorAll("[data-dismiss=modal]");

            if (typeof this._modals !== 'undefined' && this._modals) {
                this.setup();
            }
        }

        setup() {

            // Show modal
            this._modalTriggers.forEach((el, i) => {
                el.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    var target = event.target.getAttribute('data-target');
                    var modal = document.querySelector(`[data-modal-id=${target}]`);
                    this.show(modal);
                });
            });     

            // Hide via dismiss
            this._modalDismissTriggers.forEach((el, i) => {
                el.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    var modal = document.querySelector(".modal--show");
                    this.hide('dismiss', modal);
                });
            });

            // Hide on ESC key
            document.addEventListener('keyup', (event) => {
                if (event.keyCode == 27) {
                    var modal = document.querySelector(".modal--show");
                    this.hide('esc', modal);
                }
            });                   
        }

        show(modal) {
            // Show selected modal
            modal.classList.add("modal--show");        

            // Hide on overlay click
            modal.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopImmediatePropagation();
                if (event.target.classList.contains('modal--show')) {
                    this.hide('overlay', modal);
                }
            });                                           
        }

        hide(trigger, modal) {
            if (typeof modal !== 'undefined' && modal) {
                switch (trigger) {
                    case 'dismiss':
                        modal.classList.remove("modal--show");
                    break;
                    case 'esc':
                        if (modal.hasAttribute('data-close-esc')) {
                            var action = modal.getAttribute('data-close-esc');
                            if (action === 'true' || action !== undefined) {
                                modal.classList.remove("modal--show");
                            }
                        }
                    break;
                    case 'overlay':
                        if (modal.hasAttribute('data-close-overlay')) {
                            var action = modal.getAttribute('data-close-overlay');
                            if (action === 'true' || action !== undefined) {
                                modal.classList.remove("modal--show");
                            }
                        }
                    break;
                } 
            }
        }
    }
    return Modals
})()

export default Modals;