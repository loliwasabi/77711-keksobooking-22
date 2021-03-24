import {mainPinMarker, map, popupAddressField, MAP_SCALE} from './map.js';
import {CENTER_COORDINATES, ADS_COUNT} from './data.js'
// import {adResponse, createAdCard, responsePromise} from './popup.js'
// import {filteringHouse} from './filter.js'



const ONFAIL_SHOW_TIME = 5000;
const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');


const getRandomInt = (min, max) => {
  if (min < 0 || max < 0 || min > max) {
    return undefined;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const getRandomFloat = (min, max, symbolsNumber) => {
  if (min < 0 || max < 0 || min > max) {
    return undefined;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.random() * (max - min) + min).toFixed(symbolsNumber);
}


const getRandomNumberWithLeadingZero = (min, max) => {
  if (getRandomInt(min, max) < 10) {
    return '0' + getRandomInt(min, max);
  }
}


const getRandomArray = (array) => {
  const randomArray = [];
  for (let i = 0; i < getRandomInt(0, array.length); i++) {
    randomArray.push(array[getRandomInt(0, getRandomInt.length - 1)]);
  }
  return randomArray;
};


const getRandomArrayWithUniqueItems = (array) => {
  const arrayLength = getRandomInt(0, array.length);
  const resultRandomArrayWithUniqueItems = [];
  while (resultRandomArrayWithUniqueItems.length < arrayLength) {
    const maxIndex = array.length - 1;
    const randomIndex = getRandomInt(0, maxIndex);
    const randomItem = array[randomIndex];

    if (!resultRandomArrayWithUniqueItems.includes(randomItem)) {
      resultRandomArrayWithUniqueItems.push(randomItem);
    }
  }
  return resultRandomArrayWithUniqueItems;
}


const addDataToField = (componentDom, data, field) => {
  if (componentDom !== null) {
    if (data) {
      componentDom[field] = data;
    } else {
      componentDom.remove();
    }
  }
}


const onFailGetFetchAds = (message) => {
  const onFailContainer = document.createElement('div');
  onFailContainer.style.zIndex = '100';
  onFailContainer.style.position = 'absolute';
  onFailContainer.style.left = '0';
  onFailContainer.style.top = '0';
  onFailContainer.style.right = '0';
  onFailContainer.style.padding = '10px 3px';
  onFailContainer.style.fontSize = '30px';
  onFailContainer.style.textAlign = 'center';
  onFailContainer.style.backgroundColor = 'red';
  onFailContainer.textContent = message;
  document.body.append(onFailContainer);
  setTimeout(() => {
    onFailContainer.remove();
  }, ONFAIL_SHOW_TIME);
}


const onEscClickSuccess = (evt) => {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
  }
}
document.addEventListener('keydown', onEscClickSuccess);


const onSuccess = () => {
  const successPostPopup = document.createElement('div');
  successPostPopup.setAttribute('id', 'successResponse');

  const successPostTemplate = document.querySelector('#success');
  successPostPopup.append(successPostTemplate.content.cloneNode(true));
  document.body.append(successPostPopup);
  document.querySelector('.success').style.zIndex = '10000';

  const removeSuccessPopup = () => {
    const successEl = document.querySelector('#successResponse');
    successEl.remove();
  }

  successPostPopup.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeSuccessPopup();
  })
}


const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: CENTER_COORDINATES.lat,
    lng: CENTER_COORDINATES.lng,
  });
  map.setView({
    lat: CENTER_COORDINATES.lat,
    lng: CENTER_COORDINATES.lng,
  }, MAP_SCALE);

  popupAddressField.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`
}
////// заменить в фильтре
const removeAdMarkers = () => {
  const adMarkers = document.querySelectorAll('.adPins');
  const removeAdMarker = (adMarker) => {
    adMarker.remove();
  }
  adMarkers.forEach(removeAdMarker);
}
/////

const resetData = () => {
  adForm.reset();
  resetMap();
  removeAdMarkers();
  filterForm.reset();

}


const removeFailPopup = () => {
  const failEl = document.querySelector('#fail');
  if (failEl) {
    failEl.remove();
  }
}

const onEscClickFail = (evt) => {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
    removeFailPopup();
  }
}
document.addEventListener('keydown', onEscClickFail);


const onFailPostFetchAds = () => {
  const failPostPopup = document.createElement('div');
  failPostPopup.setAttribute('id', 'fail');

  const FailPostTemplate = document.querySelector('#error');
  const errorButton = document.querySelector('.error__button');

  failPostPopup.append(FailPostTemplate.content.cloneNode(true));
  document.body.append(failPostPopup);
  document.querySelector('.error').style.zIndex = '10000';

  failPostPopup.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeFailPopup();
  })

  if (errorButton) {
    errorButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      removeFailPopup();
    });
  }
}


const sliceAdList = (adDataList) => {
  return adDataList.slice(0, ADS_COUNT);
}

const showInvalidElements = (form) => {
  const invalidElements = form.querySelectorAll('input:invalid, select:invalid');
  invalidElements.forEach((invalidElement) => {
    invalidElement.style.border = 'solid 2px red';
  });
}


export {
  getRandomInt,
  getRandomFloat,
  getRandomArray,
  getRandomNumberWithLeadingZero,
  getRandomArrayWithUniqueItems,
  addDataToField,
  onFailGetFetchAds,
  onSuccess,
  onFailPostFetchAds,
  resetData,
  sliceAdList,
  showInvalidElements
};


