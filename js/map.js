import {onMapLoad, onMainPinMoveEnd} from './map-functions.js';

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


adForm.classList.add('ad-form--disabled');
fields.forEach((fieldset) => {
  fieldset.setAttribute('disabled', 'disabled');
});
mapFilter.classList.add('map__filters--disabled');
mapFilter.setAttribute('disabled', 'disabled');


/* global L:readonly */
const map = L.map('map-canvas')
  /* возвращаем активное состояние формы при при загрузке карты */
  .on('load', () => {
    onMapLoad(adForm, fields, mapFilter)
  })
  .setView({
    lat: OPENING_LAT,
    lng: OPENING_LNG,
  }, MAP_SCALE);


/*создаем слой карты */
L.tileLayer(
  TILE_LAYER,
  {
    attribution: COPYRIGHT,
  },
).addTo(map);


/* загружаем иконку для красного маркера */
const mainPinIcon = L.icon({
  iconUrl: RED_ICON_URL,
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
});


/* задаем положение красного маркера */
const mainPinMarker = L.marker(
  CENTER_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);


/* содержание поля с адресом по умолчанию - центр Токио */
popupAddressField.value = mainPinMarker.getLatLng().lat.toFixed(SYMBOLS_NUMBER) + ', ' + mainPinMarker.getLatLng().lng.toFixed(SYMBOLS_NUMBER);


/* вывод в поле с адресом новых координат, после того как пользователь закончил передвигать маркер*/
mainPinMarker.on('moveend', onMainPinMoveEnd
//   (evt) => {
//   popupAddressField.value = evt.target.getLatLng().lat.toFixed(SYMBOLS_NUMBER) + ', ' + evt.target.getLatLng().lng.toFixed(SYMBOLS_NUMBER);
// }
);


/* загружаем иконку для синего маркера */
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


export {map, popupAddressField, pinIcon, mainPinMarker, createBalloon, MAP_SCALE, CENTER_COORDINATES};
