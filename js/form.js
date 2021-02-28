import {typesAndPriceHousing} from './data.js';

const adForm = document.querySelector('.ad-form');

/* Синхронизируем поля "тип жилья" и "цена за ночь" и поля заезда и выезда */
const typeFormField = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');

// if (typeFormField.readyState === 'loading') {
//   console.log('loaded');
//   typeFormField.addEventListener('DOMContentLoaded ', (evt) => {
//     console.log('----' + evt.target.value);
//     evt.preventDefault();
//     adFormPrice.placeholder = typesAndPriceHousing.get(evt.target.value);
//     adFormPrice.min = typesAndPriceHousing.get(evt.target.value);
//   });
// } else {
//   console.log('not loaded');
// }


typeFormField.addEventListener('change', (evt) => {
  evt.preventDefault();
  adFormPrice.placeholder = typesAndPriceHousing.get(evt.target.value);
  adFormPrice.min = typesAndPriceHousing.get(evt.target.value);
});


// const timeIn = adForm.querySelector('#timein');
// const timeOut = adForm.querySelector('#timeout');
//
// timeIn.addEventListener('change', (evt) => {
//   evt.preventDefault();
//   adFormPrice.option = timeinHours.get(evt.target.value);
//
// });
//
// timeOut.addEventListener('change', (evt) => {
//   evt.preventDefault();
//   adFormPrice.option = timeutHours.get(evt.target.key);
// });





