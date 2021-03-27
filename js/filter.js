/* global _:readonly */
import {adResponse, createAdPin} from './popup.js';
import {removeAdMarkers, getSliceAdList} from './util.js';

const ANY_PRICE = 'any';
const ANY_TYPE = 'any';
const ANY_ROOMS = 'any';
const ANY_GUESTS = 'any';
const RERENDER_DELAY = 500;
const FILTER_FUNCTIONS = [];

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


/* common filter */
const filterHouse = _.debounce(
  (filterFunctionsArray) => {
    const filteredAds = [];
    const adPopup = document.querySelector('.leaflet-popup');
    if (adPopup) {
      adPopup.remove();
    }
    removeAdMarkers();
    adResponse.forEach((adData) => {
      let filteredAd = adData;
      filterFunctionsArray.forEach((filteringFunction) => {
        filteredAd = filteringFunction(filteredAd)
      })
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
  const filterByType = (adData) => {
    if (adData && (evt.target.value === adData.offer.type || evt.target.value === ANY_TYPE)) {
      return adData;
    }
    return null;
  }
  if (!FILTER_FUNCTIONS.includes(filterByType)) {
    FILTER_FUNCTIONS.push(filterByType);
  }
  filterHouse(FILTER_FUNCTIONS);
});


/* фильтрация по цене */
priceFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  const filterByPrice = (adData) => {
    const selectedPriceValue = evt.target.value;
    if (selectedPriceValue === ANY_PRICE) {
      return adData;
    } else {
      if (adData && (adData.offer.price >= PRICE_RANGE[selectedPriceValue].min) && (adData.offer.price <= PRICE_RANGE[selectedPriceValue].max)) {
        return adData;
      }
    }
    return null;
  }
  if (!FILTER_FUNCTIONS.includes(filterByPrice)) {
    FILTER_FUNCTIONS.push(filterByPrice);
  }
  filterHouse(FILTER_FUNCTIONS);
});


/* фильтрация по числу комнат */
roomsFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  const filterByRooms = (adData) => {
    if (adData && (Number(evt.target.value) === adData.offer.rooms || evt.target.value === ANY_ROOMS)) {
      return adData;
    }
    return null;
  }
  if (!FILTER_FUNCTIONS.includes(filterByRooms)) {
    FILTER_FUNCTIONS.push(filterByRooms);
  }
  filterHouse(FILTER_FUNCTIONS);
});


/* фильтрация по числу гостей */
guestsFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  const filterByGuests = (adData) => {
    if (adData && (Number(evt.target.value) === adData.offer.guests || evt.target.value === ANY_GUESTS)) {
      return adData;
    }
    return null;
  }
  if (!FILTER_FUNCTIONS.includes(filterByGuests)) {
    FILTER_FUNCTIONS.push(filterByGuests);
  }
  filterHouse(FILTER_FUNCTIONS);
});


/* фильтрация по удобствам */
housingFeatures.forEach((housingFeature) => {
  housingFeature.addEventListener('change', (evt) => {
    evt.preventDefault();
    const filterByFeatures = (adData) => {
      if (evt.target.checked) {
        if (adData && adData.offer.features.includes(evt.target.value)) {
          return adData;
        }
      } else {
        return adData;
      }
      return null;
    }
    if (!FILTER_FUNCTIONS.includes(filterByFeatures)) {
      FILTER_FUNCTIONS.push(filterByFeatures);
    }
    filterHouse(FILTER_FUNCTIONS);
  });
})


export {filterHouse};
