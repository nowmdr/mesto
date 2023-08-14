import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({profileInfo},selector) {
        super(selector);
        this._profileInfo = profileInfo;
    }

    openPopup() {
        super.openPopup();
    }

    closePopup() {
        // super.closePopup();
        // this._removeEventListeners();
    }

    _setEventListeners() {
        super._setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            this._profileInfo(evt);
            super.closePopup();
        });
    }

    // _removeEventListeners() {
    //     this._popup.removeEventListener('submit', (evt) => {
    //         this._profileInfo(evt);
    //         this.closePopup();
    //     });
    // }
}