export default class UserInfo {
    constructor({userNameSelector, userAboutSelector}) {
        this._accountName = document.querySelector(userNameSelector);
        this._accountAbout = document.querySelector(userAboutSelector);
    }

    getUserInfo() {
        return {
            name: this._accountName.textContent,
            about: this._accountAbout.textContent,
        }
    }

    setUserInfo(data) {
        this._accountName.textContent = data.name;
        this._accountAbout.textContent = data.about;
    }
}