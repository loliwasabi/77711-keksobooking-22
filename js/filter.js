/* global _:readonly */
import {createAdPin} from './popup.js';
import {removeAdMarkers, getSliceAdList, ADS_COUNT} from './util.js';
import {
  showAdsByPriceFilter,
  showAdsByTypeFilter,
  showAdsByRoomsFilter,
  showAdsByGuestsFilter,
  showAdsByFeaturesFilter
} from './filter-functions.js';
import {getCopyAdResponse} from './map.js';

const ANY_PRICE = 'any';
const ANY_TYPE = 'any';
const ANY_ROOMS = 'any';
const ANY_GUESTS = 'any';
const RERENDER_DELAY = 500;

const PRICE_RANGE = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
}

const priceFilterSelect = document.querySelector('#housing-price');
const typeFilterSelect = document.querySelector('#housing-type');
const roomsFilterSelect = document.querySelector('#housing-rooms');
const guestsFilterSelect = document.querySelector('#housing-guests');
const housingFeatures = document.querySelectorAll('#housing-features input');
const filterFunctions = {};


const filterHouse = _.debounce(
  (filterFunctionsObject) => {
    const filteredAds = [];
    const adPopup = document.querySelector('.leaflet-popup');
    if (adPopup) {
      adPopup.remove();
    }
    removeAdMarkers();
    const adResponseCopies = getCopyAdResponse();
    for (let i = 0; i <= adResponseCopies.length; i++) {
      let filteredAd = adResponseCopies[i];
      for (const [, filter] of Object.entries(filterFunctionsObject)) {
        filteredAd = filter(filteredAd);
        if (filteredAd === null) {
          break;
        }
      }
      if (filteredAd) {
        filteredAds.push(filteredAd);
      }
      if (filteredAds.length === ADS_COUNT) {
        break
      }
    }
    const sliceAdList = getSliceAdList(filteredAds);
    sliceAdList.forEach((adData) => {
      createAdPin(adData);
    })
  },
  RERENDER_DELAY,
)



typeFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  showAdsByTypeFilter(filterFunctions, ANY_TYPE, evt.target.value);
});



priceFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  showAdsByPriceFilter(filterFunctions, ANY_PRICE, PRICE_RANGE, evt.target.value);
});



roomsFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  showAdsByRoomsFilter(filterFunctions, ANY_ROOMS, evt.target.value);
});



guestsFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  showAdsByGuestsFilter(filterFunctions, ANY_GUESTS, evt.target.value);
});



housingFeatures.forEach((housingFeature) => {
  housingFeature.addEventListener('change', (evt) => {
    evt.preventDefault();
    showAdsByFeaturesFilter(filterFunctions, evt.target.checked, evt.target.value);
  });
})


export {filterHouse};
