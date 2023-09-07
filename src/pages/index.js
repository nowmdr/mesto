import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api';
import {validationSettings} from '../data/data.js';

const editProfileForm = document.querySelector('#edit-profile-form');
const addElementForm = document.querySelector('#add-element-form');
const editAvatarForm = document.querySelector('#edit-avatar-form');
const nameInput = editProfileForm.querySelector('.form__input[name="profileName"]');
const subtitleInput = editProfileForm.querySelector('.form__input[name="profileSubtitle"]');

const editBtn = document.querySelector('.profile__edit-button');
const addElementBtn = document.querySelector('.profile__add-button');
const editAvatarBtn = document.querySelector('.profile__avatar-edit-button');

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-74',
    headers: {
        authorization: 'ce52607b-24fe-43f4-b07b-f065a6cd1716',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfo(),api.getInitialCards()])
    .then(([profile, cards]) => {
        userInfo.setUserInfo(profile.name, profile.about, profile._id);
        userInfo.setUserAvatar(profile.avatar);
        cardList.renderItems(cards);
    })
    .catch(error => {
        console.log(error.status);
    })

const imagePopup = new PopupWithImage('.popup_image');
imagePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm({
    changeData: ({avatarUrl}) => {
        loaderStart(editAvatarForm)
        api.changeAvatar(avatarUrl)
        .then((data)=>{
            userInfo.setUserAvatar(data.avatar);
            editAvatarPopup.close();
            loaderEnd(editAvatarForm);
        })
        .catch(error => {
            console.log(error.status);
        })
    }
},'.popup_edit-avatar');
editAvatarPopup.setEventListeners();

const confirmDeleteElementPopup = new PopupWithConfirmation({
    handleConfirmationButtonClick: (card) => {
        api.deleteCard(card.cardId)
        .then(() => {
            card.deleteCard();
            confirmDeleteElementPopup.close();
        })
        .catch(error => {
            console.log(error.status);
        })
    }
},'.popup_delete-element');
confirmDeleteElementPopup.setEventListeners();

const userInfo = new UserInfo({name:'.profile__name', info:'.profile__subtitle', avatar:'.profile__avatar-img'});
const addElementFormPopup = new PopupWithForm({
    changeData: ({placeName, imageUrl}) => {
        loaderStart(addElementForm);
        api.addNewCard(placeName, imageUrl)
        .then((data) => {
            cardList.setItem(createNewCard(data, userInfo.getUserInfo().id));
            addElementFormPopup.close();
            loaderEnd(addElementForm);
        })
        .catch(error => {
            console.log(error.status);
        })
    }
},'.popup_add-element');
addElementFormPopup.setEventListeners();

const editProfileFormPopup = new PopupWithForm({
    changeData: ({profileName, profileSubtitle}) => {
        loaderStart(editProfileForm);
        api.changeUserInfo(profileName, profileSubtitle)
        .then(({name, about})=>{
            userInfo.setUserInfo(name, about);
            loaderEnd(editProfileForm);
            editProfileFormPopup.close();
        })
        .catch(error => {
            console.log(error.status);
        })
    }
},'.popup_edit-profile');
editProfileFormPopup.setEventListeners();

const cardList = new Section({
    renderer: (item) => {
        cardList.setItem(createNewCard(item, userInfo.getUserInfo().id));
    },
}, '.elements__list');

function createNewCard(data, userId) {
    const card = new Card({
        handleCardClick: (link, name) => {
           imagePopup.open(link, name);
        }
    }, {
        handleDeleteButtonClick: (card) => {
            confirmDeleteElementPopup.open(card);
        }
    }, {
        handleLikeButtonClick: (card) => {
            api.toggleLike(card.cardId, card.cardHaveLike)
            .then((data) => {
                card.toggleLikeStatus();
                card.updateLikesCounter(data.likes.length);
            })
            .catch(error => {
                console.log(error.status);
            })
        }
    }, data, userId, '#element-template');

    return card.generateCard();
}
function loaderStart(form) {
    const sendButton = form.querySelector('.form__send-button');
    sendButton.textContent = 'Saving...';
    sendButton.classList.toggle('form__send-button_disabled');
}
function loaderEnd(form) {
    const sendButton = form.querySelector('.form__send-button');
    sendButton.textContent = 'Save';
    sendButton.classList.toggle('form__send-button_disabled');
}
addElementBtn.addEventListener('click', () => {
    addElementFormPopup.open();
});

editBtn.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    subtitleInput.value = userData.info;
    editProfileFormPopup.open();
});

editAvatarBtn.addEventListener('click', () => {
    editAvatarPopup.open();
})

new FormValidator(validationSettings, editProfileForm).enableValidation();
new FormValidator(validationSettings, addElementForm).enableValidation();
new FormValidator(validationSettings, editAvatarForm).enableValidation();
