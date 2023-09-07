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
        const data = {};
        Array.from(this._form.querySelectorAll('.form__input')).forEach((input) => {
           data[input.name] = input.value;
        });
        return data;
    }

    _handleFormSubmit(evt) {
        evt.preventDefault();
        this._changeData(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitHandler);
    }
}