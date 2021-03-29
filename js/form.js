import {postAdsToServer} from './api.js';
import {createFailPopup, createSuccessPopup, resetData} from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const TYPES_AND_MIN_PRICE = new Map([
  ['palace', '10000'],
  ['flat', '1000'],
  ['house', '5000'],
  ['bungalow', '0'],
]);

const ROOMS_AND_CAPACITY = {
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
const typeFormField = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const addressInput = document.querySelector('#address');



const changeAttributeOfAdFormPrice = (value) => {
  adFormPrice.placeholder = TYPES_AND_MIN_PRICE.get(value);
  adFormPrice.min = TYPES_AND_MIN_PRICE.get(value);
}



typeFormField.addEventListener('change', (evt) => {
  evt.preventDefault();
  changeAttributeOfAdFormPrice(evt.target.value);
});



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



const validateRoomNumberAndCapacity = (value) => {
  const capacitiesForRoom = ROOMS_AND_CAPACITY[value];
  capacityOptions.forEach((option) => {
    const capacityValue = option.value;
    if (!capacitiesForRoom.includes(Number(capacityValue))) {
      option.setAttribute('disabled', '');
    } else {
      option.removeAttribute('disabled');
    }
    roomNumber.reportValidity();
  })
  if (!ROOMS_AND_CAPACITY[value].includes(Number(capacityRoom.value))) {
    roomNumber.style.border = 'solid 2px red';
    roomNumber.setCustomValidity('Недостаточно комнат');
  } else {
    roomNumber.setCustomValidity('');
    roomNumber.style.border = 'none';
  }
  roomNumber.reportValidity();
}



roomNumber.addEventListener('change', (evt) => {
  evt.preventDefault();
  validateRoomNumberAndCapacity(evt.target.value);
});



capacityRoom.addEventListener('change', (evt) => {
  evt.preventDefault();
  validateRoomNumberAndCapacity(roomNumber.value);
})



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



addressInput.setAttribute('readonly', '');



const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    postAdsToServer(
      createSuccessPopup,
      resetData,
      createFailPopup,
      new FormData(evt.target),
    );
  });
};



resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetData();
});


export {
  setUserFormSubmit,
  changeAttributeOfAdFormPrice,
  typeFormField
};
