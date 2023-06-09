const formClasses = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__send-button',
    inactiveButtonClass: 'form__send-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
}

const showInputError = (formElement, inputElement, errorMessage, formClasses) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formClasses.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formClasses.errorClass);
};

const hideInputError = (formElement, inputElement, formClasses) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formClasses.inputErrorClass);
    errorElement.classList.remove(formClasses.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formClasses);
    } else {
        hideInputError(formElement, inputElement, formClasses);
    }
};

const setEventListeners = (formElement, formClasses) => {
    const inputList = Array.from(formElement.querySelectorAll(formClasses.inputSelector));
    const buttonElement = formElement.querySelector(formClasses.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, formClasses);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement, formClasses);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, formClasses) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(formClasses.inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(formClasses.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const enableValidation = (formClasses) => {
    const formList = Array.from(document.querySelectorAll(formClasses.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, formClasses);
    });
};

enableValidation(formClasses);



