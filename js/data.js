export {createAuthor, createLocation, createOffer, createAd, createAds, typesTranslation};
import {getRandomInt, getRandomFloat, getRandomArray, getRandomNumberWithLeadingZero, getRandomArrayWithUniqueItems} from './util.js';


const createAuthor = () => {
  return {
    avatar: 'img/avatars/user' + getRandomNumberWithLeadingZero(1, 8) + '.png',
  };
};


const createLocation = () => {
  return {
    x: getRandomFloat(35.65000, 35.7000, 4),
    y: getRandomFloat(139.70000, 139.80000, 5),
  };
};

const typesTranslation = new Map([
  ['palace', 'Дворец'],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало'],
]);

const createOffer = () => {
  const checkins = ['12:00', '13:00', '14:00'];
  const checkouts = ['12:00', '13:00', '14:00'];
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  const typeKeys = typesTranslation.keys();
  const typeArray = Array.from(typeKeys);
  return {
    title: 'Заголовок',
    address: createLocation().x + ', ' + createLocation().y,
    price: getRandomInt(0, 100000),
    type: typeArray[getRandomInt(0, typesTranslation.size - 1)],
    rooms: getRandomInt(0, 100),
    guests: getRandomInt(0, 1000),
    checkin: checkins[getRandomInt(0, checkins.length - 1)],
    checkout: checkouts[getRandomInt(0, checkouts.length - 1)],
    features: getRandomArrayWithUniqueItems(features),
    description: 'some desc',
    photos: getRandomArray(photos),
  };
};

const createAd = () => {
  return Object.assign({}, createAuthor(), createOffer(), createLocation())
}

const ADS_COUNT = 10;
const createAds = () => new Array(ADS_COUNT).fill(null).map(() => createAd());
