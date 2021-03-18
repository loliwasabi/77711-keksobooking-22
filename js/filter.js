import {ANY_TYPE} from './data.js';
import {adResponse, createAdCard} from './popup.js';
import {sliceAdList} from './util.js';

// const filter = document.querySelector('.map__filters');
// const priceFilterSelect = document.querySelector('#housing-price');
// const roomsFilterSelect = document.querySelector('#housing-rooms');
// const guestsFilterSelect = document.querySelector('#housing-guests');
// const wifiFilterSelect = document.querySelector('#map__feature--wifi');
// const dishwasherFilterSelect = document.querySelector('#map__feature--dishwasher');
// const parkingFilterSelect = document.querySelector('#map__feature--parking');
// const washerFilterSelect = document.querySelector('#map__feature--washer');
// const elevatorFilterSelect = document.querySelector('#map__feature--elevator');
// const conditionerFilterSelect = document.querySelector('#map__feature--conditioner');


/* фильтрация по типу */
const typeFilterSelect = document.querySelector('#housing-type');

typeFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  const adMarkers = document.querySelectorAll('.adPins');
  const filteredAds = [];

  const removeAdMarker = (adMarker) => {
    adMarker.remove()
  }
  adMarkers.forEach(removeAdMarker)

  adResponse.forEach((adData) => {
    if (evt.target.value === adData.offer.type || evt.target.value === ANY_TYPE) {
      filteredAds.push(adData)
    }
  });

  const slicedAdList = sliceAdList(filteredAds);
  slicedAdList.forEach((adData) => {
    createAdCard(adData);
  })
});


