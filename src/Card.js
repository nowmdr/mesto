export default class Card {
    constructor ({handleCardClick}, name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
          this._handleCardClick(this._link, this._name);
        });
      }

      _handleLikeButtonClick() {
        this._elementLikeButton.classList.toggle('element__like-button_active');
      }

      _handleDeleteButtonClick() {
        this._element.remove();
      }
}