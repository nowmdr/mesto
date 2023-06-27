import { openPopup, imagePopup } from "./script.js";

export default class Card {
    constructor (data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getElement() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
        
        return cardElement;
      }

      generateCard() {
        this._element = this._getElement();
    
        this._elementImage = this._element.querySelector('.element__image');
        this._elementDeleteButton = this._element.querySelector('.element__delete-button');
        this._elementLikeButton = this._element.querySelector('.element__like-button');
        
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        this._setEventListeners();

        return this._element;
      }

      _setEventListeners() {
        this._elementDeleteButton.addEventListener('click', () => {
            this._handleDeleteButtonClick();
        });

        this._elementLikeButton.addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._elementImage.addEventListener('click', () => {
            this._handleImageClick();
        });
      }

      _handleLikeButtonClick() {
        this._elementLikeButton.classList.toggle('element__like-button_active');
      }

      _handleDeleteButtonClick() {
        this._element.remove();
      }

      _handleImageClick() {
        imagePopup.querySelector('.figure-popup__img').src = this._link;
        imagePopup.querySelector('.figure-popup__img').alt = this._name;
        imagePopup.querySelector('.figure-popup__caption').textContent = this._name;
        openPopup(imagePopup);
      }
}