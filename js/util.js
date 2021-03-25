import {mainPinMarker, map, popupAddressField, MAP_SCALE} from './map.js';
import {CENTER_COORDINATES} from './map.js'
import {adResponse, createAdPin} from './popup.js';

const ON_FAIL_SHOW_TIME = 5000;
const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const ADS_COUNT = 10;


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


const onEscSuccessClick = (evt) => {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
  }
}
document.addEventListener('keydown', onEscSuccessClick);


const onFormSuccessSubmit = () => {
  const successPostPopup = document.createElement('div');
  successPostPopup.setAttribute('id', 'successResponse');
  const successPostTemplate = document.querySelector('#success');
  successPostPopup.append(successPostTemplate.content.cloneNode(true));
  document.body.append(successPostPopup);
  document.querySelector('.success').style.zIndex = '10000';
  const onSuccessPopupClick = () => {
    const successPopup = document.querySelector('#successResponse');
    successPopup.remove();
  }
  successPostPopup.addEventListener('click', (evt) => {
    evt.preventDefault();
    onSuccessPopupClick();
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


export const removeAdMarkers = () => {
  const adMarkers = document.querySelectorAll('.adPins');
  const removeAdMarker = (adMarker) => {
    adMarker.remove();
  }
  adMarkers.forEach(removeAdMarker);
}


const resetData = () => {
  adForm.reset();
  resetMap();
  removeAdMarkers();
  filterForm.reset();
  const slicedAds = getSliceAdList(adResponse);
  slicedAds.forEach((slicedAd) => {
    createAdPin(slicedAd);
  })
}


const removeFailPopup = () => {
  const failPopup = document.querySelector('#fail');
  if (failPopup) {
    failPopup.remove();
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


const getSliceAdList = (adDataList) => {
  return adDataList.slice(0, ADS_COUNT);
}


export {
  addDataToField,
  showFailFetchAds,
  onFormSuccessSubmit,
  onFailPostFetchAds,
  resetData,
  getSliceAdList
};


