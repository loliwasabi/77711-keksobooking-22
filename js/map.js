import {adDataList, domAdList} from './popup.js';

export {map};


const adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');

const fieldsetList = adForm.querySelectorAll('fieldset');
fieldsetList.forEach(function (fieldset) {
  fieldset.setAttribute('disabled', 'disabled');
});

const mapFilters = document.querySelector('.map__filters');
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
  {
    lat: 35.68091,
    lng: 139.76714,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

/* вывод в консоль новых координат, после того как пользователь закончил передвигать маркер*/
mainPinMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});


// /* удаляем красный маркер */
// mainPinMarker.remove();


/* загружаем иконку для синего маркера */
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

console.log(pinIcon)

adDataList.forEach((adData, i) => {
  console.log( adData)
  const marker = L.marker({
    lat: adData.location.x,
    lng: adData.location.y,
  }, {
    pinIcon,
  });

  marker.addTo(map)
    .bindPopup(domAdList[i]);



});
