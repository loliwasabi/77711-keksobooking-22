import {createBalloon} from './map.js';
// import {typesTranslation} from './data.js';
import {addDataToField, sliceAdList} from './util.js';
import {getAdsFromServer, onFailGetFetchAds} from './api.js'

const typesTranslation = new Map([
  ['palace', 'Дворец'],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало'],
]);

const domAds = [];
let adResponse;

const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const createAdPin = (adDataParameter) => {
  const domAdCard = adTemplate.cloneNode(true);

  const popupTitle = domAdCard.querySelector('.popup__title');
  addDataToField(popupTitle, adDataParameter.offer.title, 'textContent');

  const popupAddress = domAdCard.querySelector('.popup__text--address');
  addDataToField(popupAddress, adDataParameter.offer.address, 'textContent');

  const popupPrice = domAdCard.querySelector('.popup__text--price');
  addDataToField(popupPrice, `${adDataParameter.offer.price} ₽/ночь`, 'textContent');

  const popupCapacity = domAdCard.querySelector('.popup__text--capacity');
  addDataToField(popupCapacity, `${adDataParameter.offer.rooms} комнаты для ${adDataParameter.offer.guests} гостей`, 'textContent');

  const popupTime = domAdCard.querySelector('.popup__text--time');
  addDataToField(popupTime, `Заезд после ${adDataParameter.offer.checkin}, выезд до ${adDataParameter.offer.checkout}`, 'textContent');

  const popupDescription = domAdCard.querySelector('.popup__description');
  addDataToField(popupDescription, adDataParameter.offer.description, 'textContent');

  const popupAvatar = domAdCard.querySelector('.popup__avatar');
  addDataToField(popupAvatar, adDataParameter.author.avatar, 'src');

  const popupType = domAdCard.querySelector('.popup__type');
  popupType.innerHTML = '';
  let typeTranslated;
  typeTranslated = typesTranslation.get(adDataParameter.offer.type);
  addDataToField(popupType, typeTranslated, 'textContent');

  const featureDomContainer = domAdCard.querySelector('.popup__features');
  featureDomContainer.innerHTML = '';

  const featuresDataList = adDataParameter.offer.features;
  let featuresListContent = '';
  for (let i = 0; i < featuresDataList.length; i++) {
    featuresListContent = featuresListContent.concat(`<li class="popup__feature popup__feature--${featuresDataList[i]}"></li>`);
  }
  addDataToField(featureDomContainer, featuresListContent, 'innerHTML');

  const photoDomContainer = domAdCard.querySelector('.popup__photos');
  photoDomContainer.innerHTML = '';
  const photoDataList = adDataParameter.offer.photos;
  let photoListContent = '';
  for (let i = 0; i < photoDataList.length; i++) {
    photoListContent = photoListContent.concat(`<img src="${photoDataList[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></li>`);
  }
  addDataToField(photoDomContainer, photoListContent, 'innerHTML')

  domAds.push(domAdCard);

  const lat = adDataParameter.location.lat;
  const lng = adDataParameter.location.lng;
  createBalloon(lat, lng, domAdCard)
}

const responsePromise = getAdsFromServer(onFailGetFetchAds);

responsePromise.then((responseAd) => {
  adResponse = responseAd;
  const slicedArray = sliceAdList(adResponse);

  slicedArray.forEach((adDataParameter) => {
    createAdPin(adDataParameter);
  });
});


export {adTemplate, domAds, createAdPin,responsePromise, adResponse};

