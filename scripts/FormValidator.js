export default class FormValidator {
    constructor(formClasses, formElement) {
        this._formClasses = formClasses;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._formClasses.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._formClasses.submitButtonSelector);
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

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._formClasses.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.remove(this._formClasses.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._removeErrorsAfterSending();
        });
        this._setEventListeners();
    }

    _removeErrorsAfterSending() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }
}