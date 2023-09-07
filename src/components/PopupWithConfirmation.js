import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
    constructor({handleConfirmationButtonClick},selector) {
        super(selector);
        this._handleConfirmationButtonClick = handleConfirmationButtonClick;
        this._confirmDelete = this._confirmDelete.bind(this);
        this.card = {};
    }
    open(card) {
        super.open();
        this.card = card;
    }

    _confirmDelete() {
        this._handleConfirmationButtonClick(this.card);
    }

    _setEventListeners() {
        super._setEventListeners();
        this._popup.addEventListener('submit', this._confirmDelete);
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._popup.removeEventListener('submit', this._confirmDelete);
    }
}