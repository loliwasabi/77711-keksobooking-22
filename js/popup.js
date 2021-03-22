import {createBalloon} from './map.js';
import {typesTranslation} from './data.js';
import {addDataToField, sliceAdList} from './util.js';
import {getFetchAds, onFailGetFetchAds} from './api.js'


const domAdList = [];
let adResponse;

const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const createAdCard = (adDataParam) => {
  const domAdCard = adTemplate.cloneNode(true);
  const popupTitle = domAdCard.querySelector('.popup__title');
  addDataToField(popupTitle, adDataParam.offer.title, 'textContent');

  const popupAddress = domAdCard.querySelector('.popup__text--address');
  addDataToField(popupAddress, adDataParam.offer.address, 'textContent');

  const popupPrice = domAdCard.querySelector('.popup__text--price');
  addDataToField(popupPrice, `${adDataParam.offer.price} ₽/ночь`, 'textContent');

  const popupCapacity = domAdCard.querySelector('.popup__text--capacity');
  addDataToField(popupCapacity, `${adDataParam.offer.rooms} комнаты для ${adDataParam.offer.guests} гостей`, 'textContent');

  const popupTime = domAdCard.querySelector('.popup__text--time');
  addDataToField(popupTime, `Заезд после ${adDataParam.offer.checkin}, выезд до ${adDataParam.offer.checkout}`, 'textContent');

  const popupDescription = domAdCard.querySelector('.popup__description');
  addDataToField(popupDescription, adDataParam.offer.description, 'textContent');

  const popupAvatar = domAdCard.querySelector('.popup__avatar');
  addDataToField(popupAvatar, adDataParam.author.avatar, 'src');

  const popupType = domAdCard.querySelector('.popup__type');
  popupType.innerHTML = '';
  let typeTranslated;
  typeTranslated = typesTranslation.get(adDataParam.offer.type);
  addDataToField(popupType, typeTranslated, 'textContent');

  const featureDomContainer = domAdCard.querySelector('.popup__features');
  featureDomContainer.innerHTML = '';

  const featuresDataList = adDataParam.offer.features;
  let featuresListContent = '';
  for (let i = 0; i < featuresDataList.length; i++) {
    featuresListContent = featuresListContent.concat(`<li class="popup__feature popup__feature--${featuresDataList[i]}"></li>`);
  }
  addDataToField(featureDomContainer, featuresListContent, 'innerHTML');

  const photoDomContainer = domAdCard.querySelector('.popup__photos');
  photoDomContainer.innerHTML = '';
  const photoDataList = adDataParam.offer.photos;
  let photoListContent = '';
  for (let i = 0; i < photoDataList.length; i++) {
    photoListContent = photoListContent.concat(`<img src="${photoDataList[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></li>`);
  }
  addDataToField(photoDomContainer, photoListContent, 'innerHTML')

  domAdList.push(domAdCard);

  const lat = adDataParam.location.lat;
  const lng = adDataParam.location.lng;
  createBalloon(lat, lng, domAdCard)
}

const responsePromise = getFetchAds(onFailGetFetchAds);

responsePromise.then((responseAd) => {
  adResponse = responseAd;
  const slicedArray = sliceAdList(adResponse);

  slicedArray.forEach((adDataParam) => {
    createAdCard(adDataParam);
  });
});


export {adTemplate, domAdList, createAdCard,responsePromise, adResponse};

