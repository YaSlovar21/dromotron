export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _isResponseOk(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }

     getInitialCards() {
        return fetch(`https://api.termoblok.ru/blogcards`, {
            headers: this._headers,
        })
        .then((response) => {
            return this._isResponseOk(response);
        })
    }

    getInitiatPartners() {
      return fetch(`https://api.termoblok.ru/partners`, {
          headers: this._headers,
      })
      .then((response) => {
          return this._isResponseOk(response);
      })

  }


    sendCallForm(formDataJson) {
      return fetch(`${this._baseUrl}/forms/call-form`, {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataJson),
        //isBase64Encoded: false
    })
    .then((response) => {
        return this._isResponseOk(response);
    })
    }

    sendBigForm(formDataJson) {
      return fetch(`${this._baseUrl}/forms/base-form`, {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataJson),
        //isBase64Encoded: false
    })
    .then((response) => {
        return this._isResponseOk(response);
    })
  }
}
