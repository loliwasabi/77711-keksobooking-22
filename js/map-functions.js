const activateMap = (adForm, fields, mapFilter, popupAddressField) => {
  adForm.classList.remove('ad-form--disabled');
  fields.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
    mapFilter.classList.remove('map__filters--disabled');
    mapFilter.removeAttribute('disabled');
    popupAddressField.setAttribute('readonly', 'readonly');
  });
}


const getCoordinatesOfMainPin = (symbolNumber, popupAddressField, mainPinMarker) => {
  popupAddressField.value = mainPinMarker.getLatLng().lat.toFixed(symbolNumber) + ', ' + mainPinMarker.getLatLng().lng.toFixed(symbolNumber);
}


export {activateMap, getCoordinatesOfMainPin};
