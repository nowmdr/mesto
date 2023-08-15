const initialCards = [
    {
        name: 'Kraków',
        link: 'https://images.unsplash.com/photo-1674246145742-c6e4563d94cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80'
    },
    {
        name: 'Wieliczka',
        link: 'https://images.unsplash.com/photo-1682930458825-f9eb4cb65a72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'
    },
    {
        name: 'Bialowierza Forest',
        link: 'https://images.unsplash.com/photo-1630677867586-c89f86ab3334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
        name: 'Historic Centre of Warsaw',
        link: 'https://images.unsplash.com/photo-1658474796920-a40818aaef9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Old City of Zamość',
        link: 'https://images.unsplash.com/photo-1662822872490-2165e80c7b87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'
    },
    {
        name: 'Malbork',
        link: 'https://images.unsplash.com/photo-1618341415451-c691d6ca19a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    }
];

const validationSettings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__send-button',
    inactiveButtonClass: 'form__send-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
}

export { initialCards, validationSettings };