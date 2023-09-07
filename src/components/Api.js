export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
            .then(this._getResponseData)
    }

    changeUserInfo(name, about) {
         return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._getResponseData)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
            .then(this._getResponseData)
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._getResponseData)
    }
    deleteCard(id){
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._getResponseData)
    }

    toggleLike(id, cardHaveLike) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: cardHaveLike ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
            .then(this._getResponseData)
    }

    changeAvatar(avatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarUrl
            })
        })
            .then(this._getResponseData)
    }
}