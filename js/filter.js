import {adResponse, createAdCard} from './popup.js';
import {sliceAdList} from './util.js';

const ANY_TYPE = 'any';

const ANY_ROOMS = 'any';
const ANY_GUESTS = 'any';


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


/* фильтрация по числу комнат */
const roomsFilterSelect = document.querySelector('#housing-rooms');

roomsFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  const adMarkers = document.querySelectorAll('.adPins');
  const filteredAds = [];

  const removeAdMarker = (adMarker) => {
    adMarker.remove()
  }
  adMarkers.forEach(removeAdMarker)

  adResponse.forEach((adData) => {
    if (Number(evt.target.value) === adData.offer.rooms || evt.target.value === ANY_ROOMS) {
      filteredAds.push(adData)
    }
  });

  const slicedAdList = sliceAdList(filteredAds);
  slicedAdList.forEach((adData) => {
    createAdCard(adData);
  })
});


/* фильтрация по числу гостей */
const guestsFilterSelect = document.querySelector('#housing-guests');

guestsFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  const adMarkers = document.querySelectorAll('.adPins');
  const filteredAds = [];

  const removeAdMarker = (adMarker) => {
    adMarker.remove()
  }
  adMarkers.forEach(removeAdMarker)

  adResponse.forEach((adData) => {
    console.log( evt.target.value + ' куда кликнули' + typeof evt.target.value);
    console.log(adData.offer.guests + ' знчение из даты'  + typeof adData.offer.guests)
    if (Number(evt.target.value) === adData.offer.guests || evt.target.value === ANY_ROOMS) {
      filteredAds.push(adData)
    }
  });

  const slicedAdList = sliceAdList(filteredAds);
  slicedAdList.forEach((adData) => {
    createAdCard(adData);
  })
});



/* фильтрация по цене */

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

const ANY_PRICE = 'any';

const priceFilterSelect = document.querySelector('#housing-price');

priceFilterSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  let filteredAds = [];
  const selectedPriceValue = evt.target.value;
  if (!(selectedPriceValue === ANY_PRICE)) {
    const adMarkers = document.querySelectorAll('.adPins');


    const removeAdMarker = (adMarker) => {
      adMarker.remove()
    }
    adMarkers.forEach(removeAdMarker)

    adResponse.forEach((adData) => {
      if ((adData.offer.price >= PRICE_RANGE[selectedPriceValue].min && adData.offer.price <= PRICE_RANGE[selectedPriceValue].max)
      ) {
        filteredAds.push(adData)
      }
    });
  } else {
    filteredAds = adResponse;
  }

  const slicedAdList = sliceAdList(filteredAds);
  slicedAdList.forEach((adData) => {
    createAdCard(adData);
  })
});


/* фильтрация по удобствам */
const housingFeatures = document.querySelectorAll('#housing-features input');

housingFeatures.forEach((housingFeature) => {
  housingFeature.addEventListener('change', (evt) => {
    evt.preventDefault();
    let filteredAds = [];

    if (evt.target.checked) {
      const adMarkers = document.querySelectorAll('.adPins');
      const removeAdMarker = (adMarker) => {
        adMarker.remove()
      }
      adMarkers.forEach(removeAdMarker)

      adResponse.forEach((adData) => {
        if (adData.offer.features.includes(evt.target.value)) {
          filteredAds.push(adData);
        }
      })
    } else {
      filteredAds = adResponse;
    }

    const slicedAdList = sliceAdList(filteredAds);
    slicedAdList.forEach((adData) => {
      createAdCard(adData);
    })
  })
})


