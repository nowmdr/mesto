import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, validationSettings} from '../data/data.js';


const editProfileForm = document.querySelector('#edit-profile-form');
const addElementForm = document.querySelector('#add-element-form');
const nameInput = editProfileForm.querySelector('.form__input[name="profile-name"]');
const subtitleInput = editProfileForm.querySelector('.form__input[name="profile-subtitle"]');
const placeInput = addElementForm.querySelector('.form__input[name="place-name"]');
const imgInput = addElementForm.querySelector('.form__input[name="image-url"]');

const editBtn = document.querySelector('.profile__edit-button');
const addElementBtn = document.querySelector('.profile__add-button');

function createNewCard(name, link) {
    const card = new Card({
        handleCardClick: (link, name) => {
            new PopupWithImage(link, name, '.popup_image').openPopup();
        }
    }, name, link, '#element-template');

    return card.generateCard();
}

const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        cardList.setItem(createNewCard(item.name, item.link));
    },
}, '.elements__list');

cardList.renderItems();

addElementBtn.addEventListener('click', () => {
    new PopupWithForm({
        changeData: (evt) => {
            evt.preventDefault();
            cardList.setItem(createNewCard(placeInput.value, imgInput.value));
        }
    },'.popup_add-element').openPopup();
});

editBtn.addEventListener('click', () => {
    const userInfo = new UserInfo({name:'.profile__name', info:'.profile__subtitle'});
    nameInput.value = userInfo.getUserInfo().name;
    subtitleInput.value = userInfo.getUserInfo().info;

    new PopupWithForm({
        changeData: (evt) => {
            evt.preventDefault();
            userInfo.setUserInfo(nameInput.value, subtitleInput.value);
        }
    },'.popup_edit-profile').openPopup();   
});

new FormValidator(validationSettings, editProfileForm).enableValidation();
new FormValidator(validationSettings, addElementForm).enableValidation();