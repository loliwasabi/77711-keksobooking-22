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
  createAd,
  createAds,
  typesTranslation,
  typesAndPriceHousing,
  timeinHours,
  timeutHours
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
  ['palace', '10 000'],
  ['flat', '1000'],
  ['house', '5000'],
  ['bungalow', '0'],
]);

const timeinHours = new Map([
  ['После 12', 'Выезд до 12'],
  ['После 13', 'Выезд до 13'],
  ['После 14', 'Выезд до 14'],
]);

const timeutHours = new Map([
  ['Выезд до 12', 'После 12'],
  ['Выезд до 13', 'После 13'],
  ['Выезд до 14', 'После 14'],
]);

/* createAuthor - функция */
const createAuthor = () => {
  return {
    avatar: 'img/avatars/user' + getRandomNumberWithLeadingZero(MIN_PHOTO_NUMBER, MAX_PHOTO_NUMBER) + '.png',
  };
};

/* createLocation - функция */
const createLocation = () => {
  return {
    x: getRandomFloat(MIN_X, MAX_X, SYMBOLS_NUMBER_X),
    y: getRandomFloat(MIN_Y, MAX_Y, SYMBOLS_NUMBER_Y),
  };
};

/* typesTranslation - коллекция */
const typesTranslation = new Map([
  ['palace', 'Дворец'],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало'],
]);

/* createOffer - функция */
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

/* createAd - функция */
const createAd = () => {
  return Object.assign({}, createAuthor(), createOffer(), createLocation())
}

/* createAds - функция */
const createAds = () => new Array(ADS_COUNT).fill(null).map(() => createAd());
// console.log(createAd())


