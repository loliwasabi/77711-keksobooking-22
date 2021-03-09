import {onFailGetFetchAds} from './util.js';

export {getFetchAds, postFetchAds, onFailGetFetchAds};

const getFetchAds = (onFailGetFetchAds) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        console.log('ok get');
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      console.log('error get');
      onFailGetFetchAds('При загрузке данных с сервера произошла ошибка запроса');
    });
}

const postFetchAds = (onSuccess, resetData, onFailPostFetchAds, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        console.log('ok post')
        onSuccess()
        resetData();
      } else {
        console.log('error post');
        onFailPostFetchAds();
      }
    })
    .catch(() => {
      onFailPostFetchAds();
    })
}



