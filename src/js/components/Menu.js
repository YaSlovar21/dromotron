export default class Menu {
    constructor({navSelector, navItemClass}) {
        this._navItemSelector = `.${navItemClass}`;
        this._navItemClass = navItemClass;
        this._menuContainer = document.querySelector(navSelector);
    }

    _addClass(item, className) {
        item.classList.add(className);
    }
    _removeClass(item, className) {
        item.classList.remove(className);
    }
    _toogleClass(item, className) {
        item.classList.toogle(className);
    }

    mobileOpen() {
        this._menuContainer.classList.add('nav_mobile_active');
    }

    setEventListeners() {
        let menuItems = this._menuContainer.querySelectorAll(this._navItemSelector);
        menuItems.forEach((item) => {
            item.addEventListener('mouseover', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                console.log('tmmmouch');
                this._addClass(evt.target.closest(this._navItemSelector), `${this._navItemClass}_mouseovered`);
            });
            item.addEventListener('mouseout', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                console.log('tmmmouch');
                this._removeClass(evt.target.closest(this._navItemSelector), `${this._navItemClass}_mouseovered`);
            });
            item.addEventListener('touchenter', (evt)=> {
                evt.preventDefault();
                //console.log('touch')
                //this._toogleClass(evt.target.closest(this._navItemSelector), `${this._navItemClass}_mouseovered`);
            });
            if (window.innerWidth <= 768) {
                item.addEventListener('click', (evt) => {
                    console.log('sdfsdf');
                    evt.preventDefault();
                    //evt.stopPropagation();
                });
            }
        }) ;
        
        
    }
}