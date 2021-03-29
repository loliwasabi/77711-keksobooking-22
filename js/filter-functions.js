import {filterHouse} from './filter.js';


const filterByType = (adData, anyType, value) => {
  if (adData && (value === adData.offer.type || value === anyType)) {
    return adData;
  }
  return null;
}

const showAdsByTypeFilter = (filterFunctions, anyType, value) => {
  filterFunctions.type = (adData) => {
    return filterByType(adData, anyType, value);
  };
  filterHouse(filterFunctions);
}



const filterByPrice = (adData, anyPrice, priceRange, value) => {
  const selectedPriceValue = value;
  if (selectedPriceValue === anyPrice) {
    return adData;
  } else {
    if (adData && (adData.offer.price >= priceRange[selectedPriceValue].min) &&
      (adData.offer.price <= priceRange[selectedPriceValue].max)) {
      return adData;
    }
  }
  return null;
}

const showAdsByPriceFilter = (filterFunctions, anyPrice, priceRange, value) => {
  filterFunctions.price = (adData) => {
    return filterByPrice(adData, anyPrice, priceRange, value);
  };
  filterHouse(filterFunctions);
}



const filterByRooms = (adData, anyRooms, value) => {
  if (adData && (Number(value) === adData.offer.rooms || value === anyRooms)) {
    return adData;
  }
  return null;
}

const showAdsByRoomsFilter = (filterFunctions, anyRooms, value) => {
  filterFunctions.rooms = (adData) => {
    return filterByRooms(adData, anyRooms, value);
  };
  filterHouse(filterFunctions);
}



const filterByGuests = (adData, anyGuests, value) => {
  if (adData && (Number(value) === adData.offer.guests || value === anyGuests)) {
    return adData;
  }
  return null;
}

const showAdsByGuestsFilter = (filterFunctions, anyGuests, value) => {
  filterFunctions.guests = (adData) => {
    return filterByGuests(adData, anyGuests, value);
  };
  filterHouse(filterFunctions);
}



const filterByFeatures = (adData, checked, value) => {
  if (checked) {
    if (adData && adData.offer.features.includes(value)) {
      return adData;
    }
  } else {
    return adData;
  }
  return null;
}

const showAdsByFeaturesFilter = (filterFunctions, checked, value) => {
  filterFunctions.features = (adData) => {
    return filterByFeatures(adData, checked, value);
  };
  filterHouse(filterFunctions);
}


export {
  showAdsByTypeFilter,
  showAdsByPriceFilter,
  showAdsByRoomsFilter,
  showAdsByGuestsFilter,
  showAdsByFeaturesFilter
};























