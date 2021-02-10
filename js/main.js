'use strict';

const getRandomInt = (min, max) => {
  if (min < 0 || max < 0 || min > max) {
    return undefined;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const getRandomFloat = (min, max, symbolsNumber) => {
  if (min < 0 || max < 0 || min > max) {
    return undefined;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.random() * (max - min) + min).toFixed(symbolsNumber);
}


const getRandomArray = (array) => {
  const randomArray = [];
  for (let i = 0; i < getRandomInt(0, array.length); i++) {
    randomArray.push(array[getRandomInt(0, getRandomInt.length - 1)]);
  }
  return randomArray;
};


const getRandomArrayWithUniqueItems = (array) => {
  const arrayLength = getRandomInt(0, array.length);
  const resultRandomArrayWithUniqueItems = [];
  while (resultRandomArrayWithUniqueItems.length < arrayLength) {
    const maxIndex = array.length - 1;
    const randomIndex = getRandomInt(0, maxIndex);
    const randomItem = array[randomIndex];

    if (!resultRandomArrayWithUniqueItems.includes(randomItem)) {
      resultRandomArrayWithUniqueItems.push(randomItem);
    }
  }
  return resultRandomArrayWithUniqueItems;
}


const createAuthor = () => {
  const getRandomNumberWithLeadingZero = (min, max) => {
    return '0' + getRandomInt(min, max);
  }
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


const createOffer = () => {
  const types = ['palace', 'flat', 'house', 'bungalow'];
  const checkins = ['12:00', '13:00', '14:00'];
  const checkouts = ['12:00', '13:00', '14:00'];
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  return {
    title: 'Заголовок',
    address: createLocation().x + ', ' + createLocation().y,
    price: getRandomInt(0, 100000),
    type: types[getRandomInt(0, types.length - 1)],
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
const arrayAds = new Array(ADS_COUNT).fill(null).map(() => createAd());

// console.log(arrayAds)



