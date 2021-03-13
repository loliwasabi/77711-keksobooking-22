import {
  getRandomInt,
  getRandomFloat,
  getRandomArray,
  getRandomNumberWithLeadingZero,
  getRandomArrayWithUniqueItems
} from './util.js';

export {
  createAuthor,
  createLocation,
  createOffer,
  createAdData,
  createAdDataList,
  typesTranslation,
  typesAndPriceHousing,
  timeHours
};


const MIN_PHOTO_NUMBER = 1;
const MAX_PHOTO_NUMBER = 8;
const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const MIN_ROOMS = 0;
const MAX_ROOMS = 100;
const MIN_GUESTS = 0;
const MAX_GUESTS = 1000;
const MIN_X = 35.65000;
const MAX_X = 35.7000;
const SYMBOLS_NUMBER_X = 4;
const MIN_Y = 139.70000;
const MAX_Y = 139.80000;
const SYMBOLS_NUMBER_Y = 5;
const ADS_COUNT = 10;

const typesAndPriceHousing = new Map([
  ['palace', '10000'],
  ['flat', '1000'],
  ['house', '5000'],
  ['bungalow', '0'],
]);


const createAuthor = () => {
  return {
    avatar: 'img/avatars/user' + getRandomNumberWithLeadingZero(MIN_PHOTO_NUMBER, MAX_PHOTO_NUMBER) + '.png',
  };
};


const createLocation = () => {
  return {
    x: getRandomFloat(MIN_X, MAX_X, SYMBOLS_NUMBER_X),
    y: getRandomFloat(MIN_Y, MAX_Y, SYMBOLS_NUMBER_Y),
  };
};


const typesTranslation = new Map([
  ['palace', 'Дворец'],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало'],
]);


const createOffer = () => {
  const checkins = [
    '12:00',
    '13:00',
    '14:00',
  ];
  const checkouts = [
    '12:00',
    '13:00',
    '14:00',
  ];
  const features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  const photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  const typeKeys = typesTranslation.keys();
  const typeArray = Array.from(typeKeys);

  return {
    title: 'Заголовок',
    address: createLocation().x + ', ' + createLocation().y,
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
    type: typeArray[getRandomInt(0, typesTranslation.size - 1)],
    rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
    checkin: checkins[getRandomInt(0, checkins.length - 1)],
    checkout: checkouts[getRandomInt(0, checkouts.length - 1)],
    features: getRandomArrayWithUniqueItems(features),
    description: 'some desc',
    photos: getRandomArray(photos),
  };
};


const createAdData = () => {
  return {
    author: createAuthor(),
    location: createLocation(),
    offer: createOffer(),
  }
}


const createAdDataList = () => new Array(ADS_COUNT).fill(null).map(() => createAdData());



