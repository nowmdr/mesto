export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(error => {
                console.log(error.status);
            })
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
         .then((res) => {
             if(res.ok) {
                 return res.json();
             }
             return Promise.reject(res.status);
         })
         .catch(error => {
             console.log(error.status);
         })
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(error => {
                console.log(error.status);
            })
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
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(error => {
                console.log(error.status);
            })
    }
    deleteCard(id){
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(error => {
                console.log(error.status);
            })
    }

    toggleLike(id, cardHaveLike) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: cardHaveLike ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(error => {
                console.log(error.status);
            })
    }

    changeAvatar(avatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarUrl
            })
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(error => {
                console.log(error.status);
            })
    }
}