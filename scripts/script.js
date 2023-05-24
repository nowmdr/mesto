const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const popupCloseBtn = popup.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__input[name="profile-name"]');
const subtitleInput = document.querySelector('.popup__input[name="profile-subtitle"]');
const name = document.querySelector('.profile__name');
const subtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit-button');

function getValue () {
    nameInput.value = name.textContent;
    subtitleInput.value = subtitle.textContent;
}
function setValue () {
    name.textContent = nameInput.value;
    subtitle.textContent = subtitleInput.value;
}

function togglePopup () {
    popup.classList.toggle('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    setValue();
    togglePopup();
}

editBtn.addEventListener('click', () => {
    getValue();
    togglePopup();
});
popupCloseBtn.addEventListener('click', togglePopup);
popupForm.addEventListener('submit', handleFormSubmit);

const elementTemplate = document.querySelector('#element-template').content; 
const elementsContainer = document.querySelector('.elements__list');


initialCards.forEach((item) => {
    const copyElement = elementTemplate.querySelector('.element').cloneNode(true);
    copyElement.querySelector('.element__image').src = item.link;
    copyElement.querySelector('.element__image').alt = item.name;
    copyElement.querySelector('.element__title').textContent = item.name;
    elementsContainer.append(copyElement);
    console.log(copyElement.querySelector('.element__image').getAttribute('src'),copyElement.querySelector('.element__title'));
    console.log(elementsContainer);

}) 
