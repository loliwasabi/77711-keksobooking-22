export {
  getRandomInt,
  getRandomFloat,
  getRandomArray,
  getRandomNumberWithLeadingZero,
  getRandomArrayWithUniqueItems,
  addDataToField,
  onFail
};

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


const getRandomNumberWithLeadingZero = (min, max) => {
  if (getRandomInt(min, max) < 10) {
    return '0' + getRandomInt(min, max);
  }
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


const addDataToField = (componentDom, data, field) => {
  if (componentDom !== null) {
    if (data) {
      componentDom[field] = data;
    } else {
      componentDom.remove();
    }
  }
}

/* global _:readonly */
const ONFAIL_SHOW_TIME = 5000;
const onFail = (message) => {
  const onFailContainer = document.createElement('div');
  onFailContainer.style.zIndex = 100;
  onFailContainer.style.position = 'absolute';
  onFailContainer.style.left = 0;
  onFailContainer.style.top = 0;
  onFailContainer.style.right = 0;
  onFailContainer.style.padding = '10px 3px';
  onFailContainer.style.fontSize = '30px';
  onFailContainer.style.textAlign = 'center';
  onFailContainer.style.backgroundColor = 'red';

  onFailContainer.textContent = message;

  document.body.append(onFailContainer);

  setTimeout(() => {
    onFailContainer.remove();
  }, ONFAIL_SHOW_TIME);
}



