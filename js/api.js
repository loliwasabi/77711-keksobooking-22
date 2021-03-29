import {showFailFetchAds, onEscClick} from './util.js';


const getAdsFromServer = (onFailGetFetchAds) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();

      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      onFailGetFetchAds('При загрузке данных с сервера произошла ошибка запроса');
    });
}



const postAdsToServer = (onSuccess, resetData, onFailPostFetchAds, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess()
        resetData();
      } else {
        onFailPostFetchAds();
      }
    })
    .catch(() => {
      onFailPostFetchAds();
    })
  document.addEventListener('keydown', onEscClick);
}


export {getAdsFromServer, postAdsToServer, showFailFetchAds};
