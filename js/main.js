// Функция, возвращающая случайное целое число из переданного диапазона включительно. П

const getRandomInt = function (min, max) {
  if (min < 0 || max < 0 || min > max) {
    return undefined;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let resultRandomInt = getRandomInt(-5, 35);
if (resultRandomInt === undefined) {
  alert('Вы можете ввести только положительный диапазон, включая ноль');
} else {
  alert(resultRandomInt);
}


// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomIntFloat = function (min, max, symbolsNumber) {
  if (min < 0 || max < 0 || min > max) {
    return undefined;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.random() * (max - min) + min).toFixed(symbolsNumber);
}

let resultRandomIntFloat = getRandomIntFloat(14, 152.244, 5);
if (resultRandomIntFloat === undefined) {
  alert('Вы можете ввести только положительный диапазон, включая ноль');
} else {
  alert(resultRandomIntFloat);
}
