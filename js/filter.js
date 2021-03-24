/* global _:readonly */
import {adResponse, createAdCard} from './popup.js';
import {sliceAdList} from './util.js';

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
const filteringHouse = _.debounce(
  (filterFunctionsArray) => {
    const adMarkers = document.querySelectorAll('.adPins');
    const filteredAds = [];

    const adPopup = document.querySelector('.leaflet-popup');
    if (adPopup) {
      adPopup.remove();
    }
/////
    const removeAdMarker = (adMarker) => {
      adMarker.remove();
    }
    adMarkers.forEach(removeAdMarker);
/////
    adResponse.forEach((adData) => {
      let filteredAd = adData;

      filterFunctionsArray.forEach((filteringFunction) => {
        filteredAd = filteringFunction(filteredAd)
      })

      if (filteredAd) {
        filteredAds.push(filteredAd);
      }
    });

    const slicedAdList = sliceAdList(filteredAds);
    slicedAdList.forEach((adData) => {
      createAdCard(adData);
    })
  },
  RERENDER_DELAY,
)


/* фильтрация по типу */
typeFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();

  const typeFilter = (adData) => {
    if (adData && (evt.target.value === adData.offer.type || evt.target.value === ANY_TYPE)) {
      return adData;
    }
  }
  if (!FILTER_FUNCTIONS.includes(typeFilter)) {
    FILTER_FUNCTIONS.push(typeFilter);
  }
  filteringHouse(FILTER_FUNCTIONS);
});


/* фильтрация по цене */
priceFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();

  const priceFilter = (adData) => {
    const selectedPriceValue = evt.target.value;
    if (selectedPriceValue === ANY_PRICE) {
      return adData;
    } else {
      if (adData && (adData.offer.price >= PRICE_RANGE[selectedPriceValue].min) && (adData.offer.price <= PRICE_RANGE[selectedPriceValue].max)) {
        return adData;
      }
    }
  }
  if (!FILTER_FUNCTIONS.includes(priceFilter)) {
    FILTER_FUNCTIONS.push(priceFilter);
  }
  filteringHouse(FILTER_FUNCTIONS);
});


/* фильтрация по числу комнат */
roomsFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();

  const roomFilter = (adData) => {
    if (adData && (Number(evt.target.value) === adData.offer.rooms || evt.target.value === ANY_ROOMS)) {
      return adData;
    }
  }
  if (!FILTER_FUNCTIONS.includes(roomFilter)) {
    FILTER_FUNCTIONS.push(roomFilter);
  }
  filteringHouse(FILTER_FUNCTIONS);
});


/* фильтрация по числу гостей */
guestsFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();

  const guestsFilter = (adData) => {
    if (adData && (Number(evt.target.value) === adData.offer.guests || evt.target.value === ANY_GUESTS)) {
      return adData;
    }
  }
  if (!FILTER_FUNCTIONS.includes(guestsFilter)) {
    FILTER_FUNCTIONS.push(guestsFilter);
  }
  filteringHouse(FILTER_FUNCTIONS);
});


/* фильтрация по удобствам */
housingFeatures.forEach((housingFeature) => {
  housingFeature.addEventListener('change', (evt) => {
    evt.preventDefault();

    const featuresFilter = (adData) => {
      if (evt.target.checked) {
        if (adData && adData.offer.features.includes(evt.target.value)) {
          return adData;
        }
      } else {
        return adData;
      }
    }
    if (!FILTER_FUNCTIONS.includes(featuresFilter)) {
      FILTER_FUNCTIONS.push(featuresFilter);
    }
    filteringHouse(FILTER_FUNCTIONS);
  });
})


export {filteringHouse};
