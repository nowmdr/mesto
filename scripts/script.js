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