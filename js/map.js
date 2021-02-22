export {map};
import {domAd} from './popup.js';

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
  .on('load', () => {
    console.log('Карта инициализирована')
  })
  .setView({
    lat: 35.68091,
    lng: 139.76714,
  }, 9);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// const marker = L.marker(
//   {
//     lat: 35.68091,
//     lng: 139.76714,
//   },
//   {
//     draggable: true,
//   },
// );
// marker.addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

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


// const points = [
//   {
//     title: 'Футура',
//     lat: 35.68491,
//     lng: 139.78914,
//   },
//   {
//     title: 'Шаверма',
//     lat: 35.64591,
//     lng: 139.67714,
//   },
//   {
//     title: 'Франк',
//     lat: 35.68482,
//     lng: 139.76314,
//   },
//   {
//     title: 'Ginza',
//     lat: 35.67851,
//     lng: 139.56714,
//   },
// ];
//
//
// const createCustomPopup = (point) => {
//   const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
//   const popupElement = balloonTemplate.cloneNode(true);
//
//   popupElement.querySelector('.balloon__title').textContent = point.title;
//   popupElement.querySelector('.balloon__lat-lng').textContent = `Координаты: ${point.lat}, ${point.lng}`;
//
//   return popupElement;
// };


domAd.forEach((singleAd) => {
  const {lat, lng} = singleAd;
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );


  marker
    .addTo(map)
    .bindPopup(
      domAd(singleAd),
    );
});
