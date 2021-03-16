import {adDataList, domAdList} from './popup.js';
import {CENTER_COORDINATES, ADS_COUNT} from './data.js';

const adForm = document.querySelector('.ad-form');
const fieldsetList = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const popupAddressField = document.querySelector('#address');
const SYMBOLS_NUMBER = 5;

adForm.classList.add('ad-form--disabled');
fieldsetList.forEach(function (fieldset) {
  fieldset.setAttribute('disabled', 'disabled');
});

mapFilters.classList.add('map__filters--disabled');
mapFilters.setAttribute('disabled', 'disabled');


/* global L:readonly */
const map = L.map('map-canvas')
  /* возвращаем активное состояние формы при при загрузке карты */
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    fieldsetList.forEach(function (fieldset) {
      fieldset.removeAttribute('disabled');
      mapFilters.classList.remove('map__filters--disabled');
      mapFilters.removeAttribute('disabled');
      popupAddressField.setAttribute('readonly', 'readonly');
    });
  })
  .setView({
    lat: 35.68091,
    lng: 139.76714,
  }, 9);

/*создаем слой карты */
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);


/* загружаем иконку для красного маркера */
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
mainPinMarker.on('moveend', (evt) => {
  popupAddressField.value = evt.target.getLatLng().lat.toFixed(SYMBOLS_NUMBER) + ', ' + evt.target.getLatLng().lng.toFixed(SYMBOLS_NUMBER);
});


/* загружаем иконку для синего маркера */
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const createBalloon = () => {
  const adDataListSliced = adDataList.slice(0, ADS_COUNT);
  adDataListSliced.forEach((adData, i) => {
    const marker = L.marker({
      lat: adData.location.lat,
      lng: adData.location.lng,
    }, {
      draggable: true,
      icon: pinIcon,
    });

    marker.addTo(map)
      .bindPopup(domAdList[i],
        {
          keepInView: true,
        },
      );
  });
}


export {map, popupAddressField, pinIcon, mainPinMarker, createBalloon};

