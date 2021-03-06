import {onFail} from './util.js';

export {fetchAds, postFetchAds};

const fetchAds = () => {
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
      // onError(err);
      onFail('При загрузке данных с сервера произошла ошибка запроса');
    });
}

const postFetchAds = () => {
  return fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
    .then((response) => {
      if (response.ok) {
        // onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    })
}



