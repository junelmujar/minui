const Modals = (() => {
    class Modals {    

        constructor() {

        	// Initial modals and triggers
        	this._modals               = document.querySelectorAll(".modal");
        	this._modalTriggers        = document.querySelectorAll("[data-toggle=modal]");
        	this._modalDismissTriggers = document.querySelectorAll("[data-dismiss=modal]");

            if (typeof this._modals !== 'undefined' && this._modals) {
                this.setup();
                this.bindListeners();
            }
        }

        toggleModal(event) {
            event.stopPropagation();
            var targetModalID = '[data-modal-id='+event.target.getAttribute('data-target')+']';
            var targetModal   = document.querySelector(targetModalID);
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
                var closeOnOverlayClick = el.getAttribute('data-close-overlay');
                if (closeOnOverlayClick) {
                    el.addEventListener("click", this.modalOverlayClick);
                }
            });

            this._modalDismissTriggers.forEach((el, i) => {
                el.addEventListener("click", (event) => {
                    event.preventDefault();
                    document.querySelector(".modal.show-modal").classList.remove('show-modal');
                    document.body.classList.remove("modal-shown");
                });
            });
        }

        bindListeners() {

            // Document listeners
            document.addEventListener('keyup', function(event) {
                if (event.keyCode == 27) {
                    var activeModal = document.querySelector(".modal.show-modal");
                    if (typeof activeModal !== 'undefined' && activeModal) {
                        var closeOnEsc = activeModal.getAttribute('data-close-esc');
                        if (closeOnEsc === 'undefined' || closeOnEsc === 'true') {
                            if (typeof activeModal !== 'undefined' && activeModal) {
                                activeModal.classList.remove('show-modal');
                                document.body.classList.remove("modal-shown");
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