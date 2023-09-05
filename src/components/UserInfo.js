export default class UserInfo {
    constructor({name, info, avatar}) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
        this._avatar = document.querySelector(avatar);
        this._userId = '';
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent,
            id: this._userId
        };
    }

    setUserInfo(newName, newInfo, newUserId) {
        this._name.textContent = newName;
        this._info.textContent = newInfo;
        this._userId = newUserId;
    }

    setUserAvatar(newAvatarLink) {
        this._avatar.src = newAvatarLink;
    }

  }