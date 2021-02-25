import {typesAndPriceHousing} from './data.js';

// Опишите в нём код, который реализует логику обработки пользовательского ввода для полей:
//
// «Тип жилья» — выбор опции меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь»;
// «Время заезда», «Время выезда» — выбор опции одного поля автоматически изменят значение другого.

// «Бунгало» — минимальная цена за ночь 0;
// «Квартира» — минимальная цена за ночь 1 000;
// «Дом» — минимальная цена 5 000;
// «Дворец» — минимальная цена 10 000.

// .Поля «Время заезда» и «Время выезда» синхронизированы:
// при изменении значения одного поля во втором выделяется соответствующее ему значение.
// Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.

const adForm = document.querySelector('.ad-form');
const typeFormField = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');


document.addEventListener('DOMContentLoading ', (evt) => {
  evt.preventDefault();
  adFormPrice.placeholder = typesAndPriceHousing.get(this.target.value);
  adFormPrice.min = typesAndPriceHousing.get(this.target.value);
});

typeFormField.addEventListener('change', (evt) => {
  evt.preventDefault();
  adFormPrice.placeholder = typesAndPriceHousing.get(evt.target.value);
  adFormPrice.min = typesAndPriceHousing.get(evt.target.value);
});

//
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



