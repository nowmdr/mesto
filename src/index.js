import '../pages/index.css';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
import {initialCards, validationSettings} from './data.js';

const editProfilePopup = document.querySelector('.popup_edit-profile');
const editProfileForm = editProfilePopup.querySelector('.form');
const addElementPopup = document.querySelector('.popup_add-element');
const addElementForm = addElementPopup.querySelector('.form');
const nameInput = editProfilePopup.querySelector('.form__input[name="profile-name"]');
const subtitleInput = editProfilePopup.querySelector('.form__input[name="profile-subtitle"]');
const placeInput = addElementForm.querySelector('.form__input[name="place-name"]');
const imgInput = addElementForm.querySelector('.form__input[name="image-url"]');
const editBtn = document.querySelector('.profile__edit-button');
const addElementBtn = document.querySelector('.profile__add-button');

function createCard(data) {
    console.log('create card');
    const cardList = new Section({
        data: data,
        renderer: (item) => {
            const card = new Card({
                handleCardClick: (link, name) => {
                    new PopupWithImage(link, name, '.popup_image').openPopup();
                }
            }, item.name, item.link, '#element-template');

            cardList.setItem(card.generateCard());
        },
    }, '.elements__list');

    cardList.renderItems();
}

function addElement (evt) {
    evt.preventDefault();
    const inputsValues = [{name: placeInput.value, link: imgInput.value }];
    createCard(inputsValues);
    addElementForm.reset();
}

editBtn.addEventListener('click', () => {
    const userInfo = new UserInfo({name:'.profile__name', info:'.profile__subtitle'});
    nameInput.value = userInfo.getUserInfo().name;
    subtitleInput.value = userInfo.getUserInfo().info;

    new PopupWithForm({
        profileInfo: (evt) => {
            evt.preventDefault();
            userInfo.setUserInfo(nameInput.value, subtitleInput.value);
        }
    },'.popup_edit-profile').openPopup();


});

addElementBtn.addEventListener('click', () => {
    new PopupWithForm({
        profileInfo: (evt) => {
            addElement(evt);
        }
    },'.popup_add-element').openPopup();
});

createCard(initialCards);

new FormValidator(validationSettings, editProfileForm).enableValidation();
new FormValidator(validationSettings, addElementForm).enableValidation();