function checkResponseIsOk(res) {
  if(res.ok) {
      return res.json()
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
}


export function getPlatesAllRequest() {
  return fetch('https://api.dromotron.ru/data/price_catalog')
    .then((res)=> {
      return checkResponseIsOk(res);
    })
};
