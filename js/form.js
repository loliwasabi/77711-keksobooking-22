import {typesAndPriceHousing} from './data.js';
import {postFetchAds} from './api.js';
import {onFailPostFetchAds, onSuccess, resetData} from './util.js';


const adForm = document.querySelector('.ad-form');

/* Синхронизируем поля "тип жилья" и "цена за ночь" и поля заезда и выезда */
const typeFormField = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');


typeFormField.addEventListener('change', (evt) => {
  evt.preventDefault();
  adFormPrice.placeholder = typesAndPriceHousing.get(evt.target.value);
  adFormPrice.min = typesAndPriceHousing.get(evt.target.value);
});

/* Синхронизируем поля заезда и выезда */
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

adForm.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
});



/* обработчик отправки формы */

const setUserFormSubmit =
  () => {
    adForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      postFetchAds(
        onSuccess,
        resetData,
        onFailPostFetchAds,
        new FormData(evt.target),
      );
    });
  };
export {setUserFormSubmit};


const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  resetData();
});
