export function renderLoading(state, buttonElement, textDefault, textOnLoading, textOnSended) {
  switch (state) {
    case 'default':
      buttonElement.textContent = textDefault;
      break;
    case 'loading':
      buttonElement.textContent = textOnLoading;
      break;
    case 'sended':
      buttonElement.textContent = textOnSended;
      break;
    default:
      buttonElement.textContent = textDefault;
  }
}
/* Фильтры статей в блоге */

// нигде не используется
export function isIntersection(arrA, arrB) {
  return arrA.some(item => arrB.includes(item));
}

export function isFullInclude(arrA, arrB) {
  console.log(arrA, arrB)
  return !arrA.some(item => !arrB.includes(item))
}

export function articlesMapper(tags, articles) {
  return articles.filter(item => isFullInclude(tags, item.type));
}

export function useWindowSize() {
  let windowSize = window.innerWidth;

  function handleWindowResize() {
    setTimeout(setWindowWidth(window.innerWidth), 1500);

  }

  function setWindowWidth(updatedWidth) {
    windowSize = updatedWidth;
    //console.log(windowSize);
  }

  window.addEventListener('resize', handleWindowResize)

  return windowSize;
}


export function useWindowSizeTest() {
  let windowSize = window.innerWidth;

  function handleWindowResize() {
    setWindowWidth(window.innerWidth)
    //console.log(windowSize);
  }

  function setWindowWidth(updatedWidth) {
    windowSize = updatedWidth;
  }

  window.addEventListener('resize', handleWindowResize)

  return windowSize;
}
/*

// колбэк, который нужно выполнить после того
// как изображение загрузится
export function imageLoadCallback(evt) {
  // после загрузки добавим элемент изображения в DOM
  document.body.append(evt.target);
}

// Функция для создания изображения
function loadImage(imageUrl, loadCallback) {
  const img = document.createElement('img');
  img.src = imageUrl;

  // Функция, которая записана в onload
  // будет вызвана после загрузки изображения
  img.onload = loadCallback;
}

// Теперь картинка появится в разметке только после загрузки
loadImage(
  'https://yastatic.net/q/logoaas/v1/Практикум.svg',
  imageLoadCallback
);*/


// Функция throttle будет принимать 2 аргумента:
// - callee, функция, которую надо вызывать;
// - timeout, интервал в мс, с которым следует пропускать вызовы.
export function throttle(callee, timeout) {
  // Таймер будет определять,
  // надо ли нам пропускать текущий вызов.
  let timer = null;

  // Как результат возвращаем другую функцию.
  // Это нужно, чтобы мы могли не менять другие части кода,
  // чуть позже мы увидим, как это помогает.
  return function perform(...args) {
    // Если таймер есть, то функция уже была вызвана,
    // и значит новый вызов следует пропустить.
    if (timer) return;

    // Если таймера нет, значит мы можем вызвать функцию:
    timer = setTimeout(() => {
      // Аргументы передаём неизменными в функцию-аргумент:
      callee(...args);

      // По окончании очищаем таймер:
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}