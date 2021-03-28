/* global _:readonly */
import {createAdPin, getCopyAdResponse} from './popup.js';
import {removeAdMarkers, getSliceAdList} from './util.js';
import {
  onPriceFilterSelectChange,
  onTypeFilterSelectChange,
  onRoomsFilterSelectChange,
  onGuestsFilterSelectChange,
  onFeaturesFilterSelectChange
} from './filter-functions.js';

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


/* common filter */
const filterHouse = _.debounce(
  (filterFunctionsObject) => {
    const filteredAds = [];
    const adPopup = document.querySelector('.leaflet-popup');
    if (adPopup) {
      adPopup.remove();
    }
    removeAdMarkers();
    getCopyAdResponse().forEach((adData) => {
      let filteredAd = adData;
      for (const [, filter] of Object.entries(filterFunctionsObject)) {
        filteredAd =  filter(filteredAd);
      }

      if (filteredAd) {
        filteredAds.push(filteredAd);
      }
    });
    const sliceAdList = getSliceAdList(filteredAds);
    sliceAdList.forEach((adData) => {
      createAdPin(adData);
    })
  },
  RERENDER_DELAY,
)


/* фильтрация по типу */
typeFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  onTypeFilterSelectChange(filterFunctions, ANY_TYPE, evt.target.value);
});



/* фильтрация по цене */
priceFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  onPriceFilterSelectChange(filterFunctions, ANY_PRICE, PRICE_RANGE, evt.target.value);
});



/* фильтрация по числу комнат */
roomsFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  onRoomsFilterSelectChange(filterFunctions, ANY_ROOMS, evt.target.value);
});



/* фильтрация по числу гостей */
guestsFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  onGuestsFilterSelectChange(filterFunctions, ANY_GUESTS, evt.target.value);
});



/* фильтрация по удобствам */
housingFeatures.forEach((housingFeature) => {
  housingFeature.addEventListener('change', (evt) => {
    evt.preventDefault();
    onFeaturesFilterSelectChange(filterFunctions, evt.target.checked, evt.target.value);
  });
})



export {filterHouse};
