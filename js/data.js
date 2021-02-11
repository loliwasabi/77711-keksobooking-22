import {getRandomInt, getRandomFloat, getRandomArray, getRandomArrayWithUniqueItems} from './util.js';

export {createAuthor, createLocation, createOffer, createAd};


const createAuthor = () => {
  const getRandomNumberWithLeadingZero = (min, max) => {
    if (getRandomInt(min, max) < 10) {
      return '0' + getRandomInt(min, max);
    }
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
// const arrayAds = new Array(ADS_COUNT).fill(null).map(() => createAd());
console.log(new Array(ADS_COUNT).fill(null).map(() => createAd()));



