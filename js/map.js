import {activateMap, getCoordinatesOfMainPin} from './map-functions.js';
import {getAdsFromServer, showFailFetchAds} from './api.js';
import {getSliceAdList} from './util.js';
import {createAdPin} from './popup.js';

const SYMBOLS_NUMBER = 5;
const MAP_SCALE = 9;
const OPENING_LAT = 35.68091;
const OPENING_LNG = 139.76714;
const ICON_HEIGHT = 52;
const ICON_WIDTH = 52;
const ICON_ANCHOR_HEIGHT = 52;
const ICON_ANCHOR_WIDTH = 26;
const RED_ICON_URL = './img/main-pin.svg';
const BLUE_ICON_URL = './img/pin.svg';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>';
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const CENTER_COORDINATES = {
  lat: 35.68951,
  lng: 139.69201,
};

const adForm = document.querySelector('.ad-form');
const fields = adForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const popupAddressField = document.querySelector('#address');
let adResponse;



const getCopyAdResponse = () => {
  return JSON.parse(JSON.stringify(adResponse));
}



adForm.classList.add('ad-form--disabled');
fields.forEach((fieldset) => {
  fieldset.setAttribute('disabled', 'disabled');
});
mapFilter.classList.add('map__filters--disabled');
mapFilter.setAttribute('disabled', 'disabled');



/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    const getResponsePromise = getAdsFromServer(showFailFetchAds);
    getResponsePromise.then((responseAd) => {
      adResponse = responseAd;
      const slicedArray = getSliceAdList(adResponse);
      slicedArray.forEach((adDataParameter) => {
        createAdPin(adDataParameter);
      });
      activateMap(adForm, fields, mapFilter, popupAddressField);
    });
  })
  .setView({
    lat: OPENING_LAT,
    lng: OPENING_LNG,
  }, MAP_SCALE);



L.tileLayer(
  TILE_LAYER,
  {
    attribution: COPYRIGHT,
  },
).addTo(map);



const mainPinIcon = L.icon({
  iconUrl: RED_ICON_URL,
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
});



const mainPinMarker = L.marker(
  CENTER_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);



popupAddressField.value = mainPinMarker.getLatLng().lat.toFixed(SYMBOLS_NUMBER) + ', ' + mainPinMarker.getLatLng().lng.toFixed(SYMBOLS_NUMBER);



mainPinMarker.on('move', () => {
  getCoordinatesOfMainPin(SYMBOLS_NUMBER, popupAddressField, mainPinMarker)
})



const pinIcon = L.icon({
  iconUrl: BLUE_ICON_URL,
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
});



const createBalloon = (latParameter, lngParameter, domAdCardParameter) => {
  const marker = L.marker({
    lat: latParameter,
    lng: lngParameter,
  }, {
    icon: pinIcon,
  });
  marker.addTo(map)
    .bindPopup(domAdCardParameter,
      {
        keepInView: true,
      },
    )
  marker._icon.classList.add('adPins');
}



export {
  map,
  popupAddressField,
  pinIcon,
  mainPinMarker,
  createBalloon,
  MAP_SCALE,
  CENTER_COORDINATES,
  getCopyAdResponse
};
