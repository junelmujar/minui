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
                this.bindListeners();
            }
        }

        setup() {

            var that = this;

            // Toggle
            this._modalTriggers.forEach((el, i) => {
                el.addEventListener("click", function(event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    var targetModalID = '[data-modal-id='+event.target.getAttribute('data-target')+']';
                    var targetModal   = document.querySelector(targetModalID);
                    document.body.classList.add("modal--shown");
                    targetModal.classList.toggle("modal--show");
                    that._sendEvent('minui.modal.open', event);
                });
            });

            // Overlay
            this._modals.forEach((el, i) => {
                var closeOnOverlayClick = el.getAttribute('data-close-overlay');
                if (closeOnOverlayClick === 'true') {
                    el.addEventListener("click", function(event) {
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
                el.addEventListener("click", (event) => {
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
            document.addEventListener('keyup', function(event) {
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

    return Modals
})()

export default Modals;