export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._popupCloseButton = this._popup?.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this._popupCloseHandler = this.close.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', this._popupCloseHandler);
        this._popup.addEventListener('click', this._handleOverlayClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _handleOverlayClose(evt){
        if(evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }
  }