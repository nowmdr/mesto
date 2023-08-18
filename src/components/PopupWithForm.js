import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({changeData},selector) {
        super(selector);
        this._changeData = changeData;
        this._form = this._popup.querySelector('.form');
        this._submitHandler = (evt) => this._handleFormSubmit(evt);
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputValues() {
        const data = new Object();
        Array.from(this._form.querySelectorAll('.form__input')).forEach((input) => {
           data[input.name] = input.value;
        });
        return data;
    }

    _handleFormSubmit(evt) {
        evt.preventDefault();
        this._changeData(this._getInputValues());
        this.close();
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