export default class Section {

  constructor({data, renderer, el}, cardlistSelector, delayTime=0) {
      this._renderedItems = data;
      if (!el) { //это что то для того, чтобы понять что секция внутри э
       this._container = document.querySelector(cardlistSelector);
      } else {
        this._container = el.querySelector(cardlistSelector);
      }
      this._renderer = renderer;
      this._delay = 0;
      this._delayTime = delayTime;

  }

  hide() {
    this._container.style.display = 'none';
  }

  show() {
    this._container.style.display = 'block';
  }

  hideParentEl() {
    this._container.closest('.parent-sect').style.display = 'none';
  }

  setItem(element) {
      this._container.prepend(element);
  }

  setItems(arr) {
    this._renderedItems = arr;
  }

  appendItem(element) {
      this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
    this._delay = 0;
  }

  renderFiltered(filteredData) {
   // this._container.classList.add('section-loading');
   // setTimeout(()=> {

      this.clear();
      this._renderedItems = filteredData;
      this._renderedItems.forEach(item => {
         this._renderer(item);
      });
      if (filteredData.length === 0) {
        this._container.textContent = 'По Вашему условию поиска статей пока нет.'
      }
    //  this._container.classList.remove('section-loading');
   // }, 800)
  }

  renderItems() {
      this._renderedItems.forEach(item => {
        console.log('Пытается присвоить item[\'data-wow-delay\'] для', item);
        item['data-wow-delay'] = `${this._delay/1000}s`;
        setTimeout(()=> {

          this._renderer(item);
        }, this._delay);

        this._delay += this._delayTime;
      });
  }
}