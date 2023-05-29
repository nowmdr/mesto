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
      name: 'Bialowieza Forest',
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

const popup = document.querySelector('.popup');
const editProfileForm = document.querySelector('#edit-profile-form');
const addElementForm = document.querySelector('#add-element-form');

const popupCloseBtn = popup.querySelector('.popup__close-button');
const nameInput = editProfileForm.querySelector('.form__input[name="profile-name"]');
const subtitleInput = editProfileForm.querySelector('.form__input[name="profile-subtitle"]');
const name = document.querySelector('.profile__name');
const subtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit-button');
const addElementBtn = document.querySelector('.profile__add-button');

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
    popup.querySelectorAll('.form').forEach((item) => {
        item.classList.remove('form_visible');
    });
}
function toggleVisibleForm (form) {
    form.classList.toggle('form_visible');
}
function editProfileInfo (evt) {
    evt.preventDefault();
    setValue();
    togglePopup();
}

function addElement (evt) {
    evt.preventDefault();
    const placeInput = addElementForm.querySelector('.form__input[name="place-name"]').value;
    const imgInput = addElementForm.querySelector('.form__input[name="image-url"]').value;
    elementsContainer.prepend(newCard(placeInput, imgInput));
    togglePopup();
}

editBtn.addEventListener('click', () => {
    getValue();
    togglePopup();
    toggleVisibleForm(editProfileForm);
});
addElementBtn.addEventListener('click', () => {
    togglePopup();
    toggleVisibleForm(addElementForm);
})
popupCloseBtn.addEventListener('click', togglePopup);
editProfileForm.addEventListener('submit', editProfileInfo);
addElementForm.addEventListener('submit', addElement)

const elementTemplate = document.querySelector('#element-template').content; 
const elementsContainer = document.querySelector('.elements__list');

function newCard (name, link) {
    const copyElement = elementTemplate.querySelector('.element').cloneNode(true);
    copyElement.querySelector('.element__image').src = link;
    copyElement.querySelector('.element__image').alt = name;
    copyElement.querySelector('.element__title').textContent = name;
    const likeButton = copyElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like-button_active');
    })
    return copyElement;
}

initialCards.forEach((item) => {
    elementsContainer.append(newCard(item.name, item.link));
}) 
