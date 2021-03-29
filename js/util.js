import {mainPinMarker, map, popupAddressField, MAP_SCALE} from './map.js';
import {CENTER_COORDINATES, getCopyAdResponse} from './map.js'
import {createAdPin} from './popup.js';
import {changeAttributeOfAdFormPrice, typeFormField} from './form.js';

const ON_FAIL_SHOW_TIME = 5000;
const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const ADS_COUNT = 10;
const mainContainer = document.querySelector('main');


const addDataToField = (componentDom, data, field) => {
  if (componentDom !== null) {
    if (data) {
      componentDom[field] = data;
    } else {
      componentDom.remove();
    }
  }
}


const showFailFetchAds = (message) => {
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
  }, ON_FAIL_SHOW_TIME);
}


const removeFailPopup = () => {
  const failPopup = document.querySelector('#fail');
  if (failPopup) {
    failPopup.remove();
  }
}


const removeSuccessPopup = () => {
  const successPopup = document.querySelector('#successResponse');
  if (successPopup) {
    successPopup.remove();
  }
}


const onEscClick = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    removeFailPopup();
    removeSuccessPopup();
    document.removeEventListener('keydown', onEscClick);
  }
}


const resetMap = (mainPinMarker, map, popupAddressField, centerCoordinates, mapScale) => {
  mainPinMarker.setLatLng({
    lat: centerCoordinates.lat,
    lng: centerCoordinates.lng,
  });
  map.setView({
    lat: centerCoordinates.lat,
    lng: centerCoordinates.lng,
  }, mapScale);
  popupAddressField.value = `${centerCoordinates.lat}, ${centerCoordinates.lng}`
}


const removeAdMarkers = () => {
  const adMarkers = document.querySelectorAll('.adPins');
  const removeAdMarker = (adMarker) => {
    adMarker.remove();
  }
  adMarkers.forEach(removeAdMarker);
}


const resetData = () => {
  adForm.reset();
  changeAttributeOfAdFormPrice(typeFormField.value);
  resetMap(mainPinMarker, map, popupAddressField, CENTER_COORDINATES, MAP_SCALE);
  removeAdMarkers();
  filterForm.reset();
  const slicedAds = getSliceAdList(getCopyAdResponse());
  slicedAds.forEach((slicedAd) => {
    createAdPin(slicedAd);
  })
}


const createSuccessPopup = () => {
  const successPostPopup = document.createElement('div');
  successPostPopup.setAttribute('id', 'successResponse');
  const successPostTemplate = document.querySelector('#success');
  successPostPopup.append(successPostTemplate.content.cloneNode(true));
  mainContainer.append(successPostPopup);
  document.querySelector('.success').style.zIndex = '10000';
  successPostPopup.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeSuccessPopup();
  })
}


const createFailPopup = () => {
  const failPostPopup = document.createElement('div');
  failPostPopup.setAttribute('id', 'fail');
  const failPostTemplate = document.querySelector('#error');
  const errorButton = document.querySelector('.error__button');
  failPostPopup.append(failPostTemplate.content.cloneNode(true));
  mainContainer.append(failPostPopup);
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


const getSliceAdList = (adDataList) => {
  return adDataList.slice(0, ADS_COUNT);
}


export {
  addDataToField,
  showFailFetchAds,
  createSuccessPopup,
  createFailPopup,
  resetData,
  getSliceAdList,
  removeAdMarkers,
  onEscClick,
  ADS_COUNT
};
