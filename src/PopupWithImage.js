import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(link, name, selector) {
        super(selector);
        this._link = link;
        this._name = name;
    }

    openPopup() {
        super.openPopup();
        this._addImageAndDesctiption();
    }

    _addImageAndDesctiption() {
        this._popup.querySelector('.figure-popup__img').src = this._link;
        this._popup.querySelector('.figure-popup__img').alt = this._link;
        this._popup.querySelector('.figure-popup__caption').textContent = this._name;
    }    
  }