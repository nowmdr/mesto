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

const editProfilePopup = document.querySelector('.popup_edit-profile');
const editProfileForm = editProfilePopup.querySelector('.form');
const addElementPopup = document.querySelector('.popup_add-element');
const addElementForm = addElementPopup.querySelector('.form');
const imagePopup = document.querySelector('.popup_image');
const imagePopupFigure = imagePopup.querySelector('.figure-popup')
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
function openPopup(popup) {
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
    elementsContainer.prepend(createCard(placeInput.value, imgInput.value));
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
addElementForm.addEventListener('submit', addElement)

function createCard (name, link) {
    const copyElement = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage =  copyElement.querySelector('.element__image');
    elementImage.src = link;
    elementImage.alt = name;
    elementImage.addEventListener('click', () => {
        imagePopupFigure.querySelector('.figure-popup__img').src = link;
        imagePopupFigure.querySelector('.figure-popup__img').alt = name;
        imagePopupFigure.querySelector('.figure-popup__caption').textContent = name;
        openPopup(imagePopup);
    })

    copyElement.querySelector('.element__title').textContent = name;

    const likeButton = copyElement.querySelector('.element__like-button');
    const deleteButton = copyElement.querySelector('.element__delete-button');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like-button_active');
    })
    deleteButton.addEventListener('click', () => {
      copyElement.remove();
    })
    return copyElement;
}

initialCards.forEach((item) => {
    elementsContainer.append(createCard(item.name, item.link));
})

fillProfileEditFormInputs();

