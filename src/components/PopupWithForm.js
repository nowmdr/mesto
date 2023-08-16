import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({changeData},selector) {
        super(selector);
        this._changeData = changeData;
        this._form = this._popup.querySelector('.form');
        this._submitHandler = (evt) => this._handleFormSubmit(evt);
    }

    openPopup() {
        super.openPopup();
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }

    _handleFormSubmit(evt) {
        this._changeData(evt);
        this.closePopup();
    }

    _setEventListeners() {
        super._setEventListeners();
        this._popup.addEventListener('submit', this._submitHandler);
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._popup.removeEventListener('submit', this._submitHandler);
    }
}