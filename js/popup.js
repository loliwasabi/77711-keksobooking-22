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

  ////////////////////////////
  const popupAddress = adElement.querySelector('.popup__text--address');
  addDataToField(popupAddress, singleAd.address, 'textContent');



  adElement.querySelector('.popup__text--address').textContent = singleAd.address;
  adElement.querySelector('.popup__text--price').textContent = `${singleAd.price} ₽/ночь`;
  adElement.querySelector('.popup__text--capacity').textContent = `${singleAd.rooms} комнаты для ${singleAd.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${singleAd.checkin}, выезд до ${singleAd.checkout}`;
  adElement.querySelector('.popup__description').textContent = singleAd.description;
  adElement.querySelector('.popup__avatar').src = singleAd.avatar;


  let typeTranslated;
  adElement.querySelector('.popup__type').innerHTML = '';
  typeTranslated = typesTranslation.get(singleAd.type);
  adElement.querySelector('.popup__type').textContent = typeTranslated;


  const featureContainer = adElement.querySelector('.popup__features');
  if (featureContainer !== null) {
    featureContainer.innerHTML = '';
    const featuresList = singleAd.features;
    for (let i = 0; i < featuresList.length; i++) {
      featureContainer.innerHTML = featureContainer.innerHTML.concat(`<li class="popup__feature popup__feature--${featuresList[i]}"></li>`);
    }
  }
  adElement.appendChild(featureContainer);
  domAd.push(adElement);


  const photoContainer = adElement.querySelector('.popup__photos');
  if (photoContainer !== null) {
    photoContainer.innerHTML = '';
    const photoList = singleAd.photos;
    for (let i = 0; i < photoList.length; i++) {
      photoContainer.innerHTML = photoContainer.innerHTML.concat(`<img src="${photoList[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></li>`);
    }
  }


});

mapCanvas.appendChild(domAd[0]);



