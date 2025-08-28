
```sql
CREATE TABLE `api.dromotron.ru/mainpagecats`
(
    `id` BigSerial NOT NULL,
    `title` Utf8 NOT NULL,
    `desc` Utf8,
    `linkPage` Utf8 DEFAULT "NULL",
    `poster` Utf8 DEFAULT "NULL",
    PRIMARY KEY (`id`)
)
WITH (
    AUTO_PARTITIONING_BY_SIZE = ENABLED,
    AUTO_PARTITIONING_BY_LOAD = DISABLED,
    AUTO_PARTITIONING_PARTITION_SIZE_MB = 2048,
    AUTO_PARTITIONING_MIN_PARTITIONS_COUNT = 1,
    KEY_BLOOM_FILTER = DISABLED
);

```

```html
каждые 4 строчки это данные 1й записи
title Utf8
desc Utf8
linkPage Utf8
poster Utf8

Пластины
для теплообменников
/komplektuyushchie-dlya-teploobmennikov/plates/
/api-images/categories/plastina-ti165-1234-l.png

Уплотнения
для теплообменников
/komplektuyushchie-dlya-teploobmennikov/uplots/
/api-images/categories/uplotnenie-ti025-start-clip-on.png

Рамы, плиты, станины, шпильки
для теплообменников
null
/api-images/categories/group-1000002424.png

Резиновые вставки
для теплообменников
null
/api-images/categories/vstavka-rezinovaya-ti-dn65h25-2-1.png

Детали пищевого исполнения
для теплообменников
null
/api-images/refs/zag_oblic.png

```

Я использую pc-first верстку
В моей версии tailwind класс адаптации под устройства `${значение screen}:${класс tw}`
Например для текста
```html
<p class="text-xl mobile:text-lg mobilesm:text-base">Тут текст</p>
```

### Мой конфиг тэйлвайнд
Цветовую гамму (в colors) используй из конфига
```js
module.exports = {
  content: ["./src/**/*.html"],
  theme: {
    extend: {
      screens: {
        'pc': {'max': '1620px'},
        'mvpc': {'max': '1441px'},
        'olpc': {'max': '1240px'},
        'laptop': {'max': '1024px'},
        'mobile': {'max': '639px'},
        'mobilesm': { 'max': '345px' },
      },
      colors: {
        primary: {
          red: '#CD2C2C', //кнопки (можно только обводить красным)
          black: '#171515', // текст
          lightgray: '#E8E8E8', //цвет фона
          gray: '#7D7B7B', //цвет описаний
          white: '#fff' // фон карточек и прочего
        },

      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],