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

const editBtn = document.querySelector('.profile__edit-button');
const addElementBtn = document.querySelector('.profile__add-button');

const imagePopup = new PopupWithImage('.popup_image');
const userInfo = new UserInfo({name:'.profile__name', info:'.profile__subtitle'});
const addElementFormPopup = new PopupWithForm({
    changeData: (array) => {
        cardList.setItem(createNewCard(array[0].value, array[1].value));
    }
},'.popup_add-element');

const editProfileFormPopup = new PopupWithForm({
    changeData: (array) => {
        userInfo.setUserInfo(array[0].value, array[1].value);
    }
},'.popup_edit-profile');
const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        cardList.setItem(createNewCard(item.name, item.link));
    },
}, '.elements__list');

function createNewCard(name, link) {
    const card = new Card({
        handleCardClick: (link, name) => {
           imagePopup.open(link, name);
        }
    }, name, link, '#element-template');

    return card.generateCard();
}

cardList.renderItems();

addElementBtn.addEventListener('click', () => {
    addElementFormPopup.open();
});

editBtn.addEventListener('click', () => {
    nameInput.value = userInfo.getUserInfo().name;
    subtitleInput.value = userInfo.getUserInfo().info;
    editProfileFormPopup.open();
});

new FormValidator(validationSettings, editProfileForm).enableValidation();
new FormValidator(validationSettings, addElementForm).enableValidation();