export default class Popup {
    constructor(selector) {
      this._popup = document.querySelector(selector);
      this._popupCloseButton = this._popup?.querySelector('.popup__close-button');
    }
    
  
    openPopup() {
        this._popup.classList.add('popup_opened');
        this._setEventListeners();
    }


    closePopup() {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    _setEventListeners() {
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        this._popupCloseButton.addEventListener('click', () => {
            this.closePopup();
        });
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup_opened')) {
                this.closePopup();
            }
        });
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        this._popupCloseButton.removeEventListener('click', () => {
            this.closePopup();
        });
        this._popup.removeEventListener('click', () => {
            if(evt.target.classList.contains('popup_opened')) {
                this.closePopup();
            }
        });
    }


    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            // const openedPopup = document.querySelector('.popup_opened');
            this.closePopup();
        }
    }
  }