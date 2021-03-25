// import {typesAndPriceHousing, roomsAndCapacity} from './data.js';
import {postAdsToServer} from './api.js';
import {onFailPostFetchAds, onSuccess, resetData} from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
// const MAX_PRICE = 1000000;
const typesAndPriceHousing = new Map([
  ['palace', '10000'],
  ['flat', '1000'],
  ['house', '5000'],
  ['bungalow', '0'],
]);

const roomsAndCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const adForm = document.querySelector('.ad-form');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacityRoom = adForm.querySelector('#capacity');
const titleInput = document.querySelector('#title');
const resetButton = document.querySelector('.ad-form__reset');
const capacityOptions = capacityRoom.querySelectorAll('option');
// const roomOptions = roomNumber.querySelectorAll('option');

/* Синхронизируем поля "тип жилья" и "цена за ночь" и поля заезда и выезда */
const typeFormField = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');

typeFormField.addEventListener('change', (evt) => {
  evt.preventDefault();
  adFormPrice.placeholder = typesAndPriceHousing.get(evt.target.value);
  adFormPrice.min = typesAndPriceHousing.get(evt.target.value);
});


/* Синхронизируем поля заезда и выезда */
timeIn.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
});


/* Синхронизация и валидация количества комнат и гостей */
roomNumber.addEventListener('change', (evt) => {
  evt.preventDefault();
  const capacitiesForRoom = roomsAndCapacity[evt.target.value];
  capacityOptions.forEach((option) => {
    const capacityValue = option.value;
    if (!capacitiesForRoom.includes(Number(capacityValue))) {
      option.setAttribute('disabled', '');
    } else {
      option.removeAttribute('disabled');
    }
    roomNumber.reportValidity();
  })
  const roomCount = evt.target.value;
  if (!roomsAndCapacity[roomCount].includes(Number(capacityRoom.value))) {
    roomNumber.style.border = 'solid 2px red';
    roomNumber.setCustomValidity('недостаточно комнат');
  } else {
    roomNumber.setCustomValidity('');
    roomNumber.style.border = 'none';
  }
  roomNumber.reportValidity();

});


/* валидация поля для заголовка */
titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});


/* валидация поля для адреса  */
const addressInput = document.querySelector('#address');
addressInput.setAttribute('readonly', '');


/* обработчик отправки формы */
const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();


    postAdsToServer(
      onSuccess,
      resetData,
      onFailPostFetchAds,
      new FormData(evt.target),
    );
  });
};


resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetData();
});


export {setUserFormSubmit};
