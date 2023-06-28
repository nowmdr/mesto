import Card from './card.js';
import initialCards from './data.js';

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
const elementTemplate = document.querySelector('#element-template').content;
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
function addElement (evt) {
    evt.preventDefault();
    const data = {
        name: placeInput.value,
        link: imgInput.value
    }

    elementsContainer.prepend(new Card(data, '#element-template').generateCard());
    addElementForm.reset();
    closePopup(addElementPopup);
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
    if(evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
});
addElementPopup.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(addElementPopup);
})
addElementPopup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
});
imagePopup.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(imagePopup);
})
imagePopup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
});
editProfileForm.addEventListener('submit', editProfileInfo);
addElementForm.addEventListener('submit', addElement);


initialCards.forEach((item) => {
    elementsContainer.append(new Card(item, '#element-template').generateCard());
})

fillProfileEditFormInputs();

