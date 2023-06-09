import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, validationSettings} from './data.js';

const editProfilePopup = document.querySelector('.popup_edit-profile');
const editProfileForm = editProfilePopup.querySelector('.form');
const addElementPopup = document.querySelector('.popup_add-element');
const addElementForm = addElementPopup.querySelector('.form');
export const imagePopup = document.querySelector('.popup_image');
const nameInput = editProfilePopup.querySelector('.form__input[name="profile-name"]');
const subtitleInput = editProfilePopup.querySelector('.form__input[name="profile-subtitle"]');
const placeInput = addElementForm.querySelector('.form__input[name="place-name"]');
const imgInput = addElementForm.querySelector('.form__input[name="image-url"]');
const name = document.querySelector('.profile__name');
const subtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit-button');
const addElementBtn = document.querySelector('.profile__add-button');
const elementsContainer = document.querySelector('.elements__list');

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function fillProfileEditFormInputs () {
    nameInput.value = name.textContent;
    subtitleInput.value = subtitle.textContent;
}
function fillProfileFields () {
    name.textContent = nameInput.value;
    subtitle.textContent = subtitleInput.value;
}
function editProfileInfo (evt) {
    evt.preventDefault();
    fillProfileFields();
    closePopup(editProfilePopup);
}
function createCard (name, link) {
    return new Card(name, link, '#element-template').generateCard();
}
function addElement (evt) {
    evt.preventDefault();
    elementsContainer.prepend(createCard(placeInput.value, imgInput.value));
    addElementForm.reset();
    closePopup(addElementPopup);
}
function closePopupByOverlay (evt) {
    closePopupByOverlay(evt)
}
editBtn.addEventListener('click', () => {
    fillProfileEditFormInputs();
    openPopup(editProfilePopup);
});
addElementBtn.addEventListener('click', () => {
    openPopup(addElementPopup)
});
editProfilePopup.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(editProfilePopup);
});
editProfilePopup.addEventListener('click', (evt) => {
    closePopupByOverlay(evt)
});
addElementPopup.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(addElementPopup);
})
addElementPopup.addEventListener('click', (evt) => {
    closePopupByOverlay(evt)
});
imagePopup.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(imagePopup);
})
imagePopup.addEventListener('click', (evt) => {
    closePopupByOverlay(evt)
});
editProfileForm.addEventListener('submit', editProfileInfo);
addElementForm.addEventListener('submit', addElement);


initialCards.forEach((item) => {
    elementsContainer.append(createCard(item.name, item.link, '#element-template'));
})

fillProfileEditFormInputs();

new FormValidator(validationSettings, editProfileForm).enableValidation();
new FormValidator(validationSettings, addElementForm).enableValidation();