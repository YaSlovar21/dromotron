import CardWithDynamicObj from "./CardWithDynamicObj.js";
import Section from "./Section.js";

export default class DynamicRenderer {
  constructor(configFields) {
    this._configFields = configFields;
    this._elementsMap = new Map();
    this._sectionsMap = new Map();

    const configBySelector = {};
    configFields.forEach(config => {
        if (!configBySelector[config.selector]) {
            configBySelector[config.selector] = [];
        }
        configBySelector[config.selector].push(config);
    });

    this._configBySelector = configBySelector;
  }

  _configElementsMap(elementNode) {
    /*if (!this._element) {
      console.warn('Элемент для которого конфигурируем карту не найден')
    }*/
    // Находим элементы и создаем приватные переменные
    Object.keys(this._configBySelector).forEach(selector => {
        const element = elementNode.querySelector(selector);

        if (element) {
            const configs = this._configBySelector[selector];

            configs.forEach(config => {
                // Создаем приватную переменную с нужным именем
                this[config.privateVarname] = element;
                if (config.whatChange !== 'array') {
                  // Сохраняем конфиг в карту для быстрого доступа
                  this._elementsMap.set(config.privateVarname, {
                      element: element,
                      whatChange: config.whatChange,
                      keyInData: config.key_in_dataobj,
                      formatter: config.formatter || false,
                      type: 'property'
                  });
                } else {
                  this._elementsMap.set(config.privateVarname, {
                    element: element,
                    whatChange: config.whatChange,
                    keyInData: config.key_in_dataobj,
                    type: 'array' // тип - array
                  });
                   const innerConfig = config.configForInnerSection;
                  // Создаем и сохраняем экземпляр Section
                  const section = new Section({
                      items: [], // пустой массив, заполним при open()
                      el: elementNode,
                      renderer: (item) => {
                          const card = new CardWithDynamicObj({
                            cardTemplateSelector: innerConfig.cardTemplateSelector,
                            cardSelector: innerConfig.cardSelector,
                            configFields: innerConfig.configFields,
                            cardObj: item,

                          });
                          const cardElement = card.generateCard();
                          section.appendItem(cardElement);
                      }
                  }, selector); // ← передаем селектор как второй параметр

                  this._sectionsMap.set(config.privateVarname, section);
                }
            });
        } else {
            console.warn(`Элемент с селектором ${selector} не найден в карточке`);
        }
    });
  }

  _setProperty(config, data) {
    const element = config.element;
    const property = config.whatChange;
    const dataKey = config.keyInData;
    const formatter = config.formatter || false;
   // console.log('formatter', formatter);
    if (data[dataKey] === null) {
      if (element.closest('.parent-sect')) {
        element.closest('.parent-sect').style.display = 'none'; // КОСТЫЛЬЕЗЕ
      }
      //console.log("element.closest('.parent-sect')", element.closest('.parent-sect'));
    }
    if (element && data[dataKey] !== undefined && data[dataKey] !== null) {
        if (property === 'textContent') {
            element.textContent = formatter ? formatter(data[dataKey]) : data[dataKey];
        } else if (property === 'innerHTML') {
            element.innerHTML = formatter ? formatter(data[dataKey]) : data[dataKey];;
        } else if (property === 'src') {
            element.src =formatter ? formatter(data[dataKey]) : data[dataKey];;
        } else if (property === 'alt') {
            element.alt = formatter ? formatter(data[dataKey]) : data[dataKey];;
        } else if (property in element) {
            element[property] = formatter ? formatter(data[dataKey]) : data[dataKey];;
        }
    }
  }


  _renderArray(config, privateVarname, data) {
    const dataKey = config.keyInData;
    const section = this._sectionsMap.get(privateVarname);
    console.log('Пытаемся отрендерить массивчик тегов data[dataKey]=',data[dataKey], Array.isArray(data[dataKey]))
    console.log(this._sectionsMap)
    console.log('config.', config);
    if (section && Array.isArray(data[dataKey])) {
      if (section._container.closest('.parent-sect') && !data[dataKey].length) {
        console.log('YOOOO section._container.closest')
        section._container.closest('.parent-sect').style.display = 'none'; // КОСТЫЛЬЕЗЕ
      }
      console.log("element.closest('.parent-sect')", section);
        // Очищаем контейнер
        config.element.innerHTML = '';
        // Рендерим элементы
        section.setItems(data[dataKey]);

        section.renderItems();
    }
  }

  _renderObj(data) {
    // Проходим по всем сохраненным конфигурациям
    this._elementsMap.forEach((config, privateVarname) => {
      if (config.type === 'property') {
          this._setProperty(config, data);
      }
    });
     // Затем рендерим массивы (секции)
     this._elementsMap.forEach((config, privateVarname) => {
      if (config.type === 'array') {
          this._renderArray(config, privateVarname, data);
      }
    });
  }

  _clearObj() {

    // Очищаем секции при закрытии
    this._sectionsMap.forEach((section, privateVarname) => {
     const config = this._elementsMap.get(privateVarname);
     if (config && config.element) {
         config.element.innerHTML = '';
     }
   });

    // Очистка данных при закрытии (опционально)
    this._elementsMap.forEach((config, privateVarname) => {
        const element = config.element;
        const property = config.whatChange;

        if (element) {
            if (property === 'textContent' || property === 'innerHTML') {
                element[property] = '';
            } else if (property === 'src') {
                element.src = '';
            } else if (property === 'alt') {
                element.alt = '';
            } else if (property === 'value') {
                element.value = '';
            }
        }
    });
 }

   // Дополнительный метод для обновления только определенных полей
   updateField(fieldName, value) {
    const config = this._elementsMap.get(fieldName);
    if (config && config.element) {
        config.element[config.whatChange] = value;
    }
}


}