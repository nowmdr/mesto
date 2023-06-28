export default class FormValidator {
    constructor(formClasses, formElement) {
        this._formClasses = formClasses;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._formClasses.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._formClasses.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._formClasses.inputErrorClass);
        errorElement.classList.remove(this._formClasses.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._formClasses.inactiveButtonClass);
            buttonElement.setAttribute('disabled', '');
        } else {
            buttonElement.classList.remove(this._formClasses.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._formClasses.inputSelector));
        const buttonElement = this._formElement.querySelector(this._formClasses.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._checkValidityAfterSending();
        });
        this._setEventListeners();
    }

    _checkValidityAfterSending() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._formClasses.inputSelector));
        inputList.forEach((inputElement) => {
            let event = new Event('input');
            inputElement.dispatchEvent(event);
            this._hideInputError(inputElement);
        });
    }
}