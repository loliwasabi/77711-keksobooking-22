export {mapCanvas, similarAdTemplate, similarAds};
import {createAds, typesTranslation} from './data.js';
import {addDataToField} from './util.js';


const mapCanvas = document.querySelector('#map-canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAds = createAds();
const domAd = [];

similarAds.forEach((singleAd) => {
  const adElement = similarAdTemplate.cloneNode(true);

  const popupTitle = adElement.querySelector('.popup__title');
  addDataToField(popupTitle, singleAd.title, 'textContent');

  const popupAddress = adElement.querySelector('.popup__text--address');
  addDataToField(popupAddress, singleAd.address, 'textContent');

  const popupPrice = adElement.querySelector('.popup__text--price');
  addDataToField(popupPrice, `${singleAd.price} ₽/ночь`, 'textContent');

  const popupCapacity = adElement.querySelector('.popup__text--capacity');
  addDataToField(popupCapacity, `${singleAd.rooms} комнаты для ${singleAd.guests} гостей`, 'textContent');

  const popupTime = adElement.querySelector('.popup__text--time');
  addDataToField(popupTime, `Заезд после ${singleAd.checkin}, выезд до ${singleAd.checkout}`, 'textContent');

  const popupDescription = adElement.querySelector('.popup__description');
  addDataToField(popupDescription, singleAd.description, 'textContent');

  const popupAvatar = adElement.querySelector('.popup__avatar');
  addDataToField(popupAvatar, singleAd.avatar, 'src');

  const popupType = adElement.querySelector('.popup__type');
  popupType.innerHTML = '';
  let typeTranslated;
  typeTranslated = typesTranslation.get(singleAd.type);
  addDataToField(popupType, typeTranslated, 'textContent');

  const featureContainer = adElement.querySelector('.popup__features');
  featureContainer.innerHTML = '';
  const featuresList = singleAd.features;
  let featuresListContent = '';
  for (let i = 0; i < featuresList.length; i++) {
    featuresListContent = featuresListContent.concat(`<li class="popup__feature popup__feature--${featuresList[i]}"></li>`);
  }
  addDataToField(featureContainer, featuresListContent, 'innerHTML');

  const photoContainer = adElement.querySelector('.popup__photos');
  photoContainer.innerHTML = '';
  const photoList = singleAd.photos;
  let photoListContent = '';
  for (let i = 0; i < photoList.length; i++) {
    photoListContent = photoListContent.concat(`<img src="${photoList[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></li>`);
  }
  addDataToField(photoContainer, photoListContent, 'innerHTML')

  domAd.push(adElement);
});

mapCanvas.appendChild(domAd[0]);



