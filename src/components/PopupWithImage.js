import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._img = this._popup.querySelector('.figure-popup__img');
        this._caption = this._popup.querySelector('.figure-popup__caption');
    }

    open(link, name) {
        super.open();
        this._addImageAndDescription(link, name);
    }

    _addImageAndDescription(link, name) {
        this._img.src = link;
        this._img.alt = link;
        this._caption.textContent = name;
    }    
  }