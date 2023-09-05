export default class Card {
    constructor ({handleCardClick},{handleDeleteButtonClick},{handleLikeButtonClick}, data, userId, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes.length;
        this._likesArray = data.likes;
        this.cardHaveLike = false;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleLikeButtonClick = handleLikeButtonClick;
        this.cardId = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
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
        this._elementLikeCounter = this._element.querySelector('.element__like-counter');

        this.updateLikesCounter(this._likes);
        if(this._userId !== this._ownerId) {
            this._elementDeleteButton.classList.add('element__delete-button_hidden');
        }

        this._likesArray.forEach((like)=> {
            if(like._id === this._userId) {
                this.toggleLikeStatus();
                this.cardHaveLike = true;
            }
        })
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        this._setEventListeners();
        
        return this._element;
      }

      _setEventListeners() {
        this._elementDeleteButton.addEventListener('click', () => {
            this._handleDeleteButtonClick(this);
        });

        this._elementLikeButton.addEventListener('click', () => {
            this._handleLikeButtonClick(this);
        });

        this._elementImage.addEventListener('click', () => {
          this._handleCardClick(this._link, this._name);
        });
      }

      toggleLikeStatus() {
          this._elementLikeButton.classList.toggle('element__like-button_active');
          this.cardHaveLike = !this.cardHaveLike;
      }

      updateLikesCounter(likesCount) {
          this._elementLikeCounter.textContent = likesCount;
      }

      deleteCard() {
        this._element.remove();
      }
}