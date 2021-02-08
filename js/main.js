'use strict';

const getRandomInt = (min, max) => {
  if (min < 0 || max < 0 || min > max) {
    return undefined;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = function (min, max, symbolsNumber) {
  if (min < 0 || max < 0 || min > max) {
    return undefined;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.random() * (max - min) + min).toFixed(symbolsNumber);
}

const createAuthor = () => {
  const getRandomNumberWithLeadingZero = (min, max) => {
    return '0' + getRandomInt(min, max);
  }

  return {
    avatar: 'img/avatars/user' + getRandomNumberWithLeadingZero(1, 8) + '.png',
  };
};

// console.log(createAuthor());

const createLocation = () => {
  return {
    x: getRandomFloat(35.65000, 35.7000, 4),
    y: getRandomFloat(139.70000, 139.80000, 5),
  };
};

// console.log(createLocation());

const createOffer = () => {
  const TYPE_LIST = ['palace', 'flat', 'house', 'bungalow'];
  const CHECKIN_LIST = ['12:00', '13:00', '14:00'];
  const CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
  const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const PHOTOS_LIST = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  const getRandomArray = (array) => {
    const randomArray = [];
    for (let i = 0; i < getRandomInt(0, array.length); i++) {

      randomArray.push(array[getRandomInt(0, getRandomInt.length - 1)]);
    }
    return randomArray;
  }

  return {
    title: 'Заголовок',
    address: createLocation().x + ', ' + createLocation().y,
    price: getRandomInt(0, 100000),
    type: TYPE_LIST[getRandomInt(0, TYPE_LIST.length - 1)],
    rooms: getRandomInt(0, 100),
    guests: getRandomInt(0, 1000),
    checkin: CHECKIN_LIST[getRandomInt(0, CHECKIN_LIST.length - 1)],
    checkout: CHECKOUT_LIST[getRandomInt(0, CHECKOUT_LIST.length - 1)],
    features: getRandomArray(FEATURES_LIST),
    description: 'some desc',
    photos: getRandomArray(PHOTOS_LIST),
  };
};

// console.log(createOffer());

const createAd = () => {
  return Object.assign({}, createAuthor(), createOffer(), createLocation())
}

// console.log(createAd());

const ADS_COUNT = 10;
const arrayAds = new Array(ADS_COUNT).fill(null).map(() => createAd());

// console.log(arrayAds);

