import {popupAddressField} from './map.js';


const onMapLoad = (adForm, fields, mapFilter) => {
  adForm.classList.remove('ad-form--disabled');
  fields.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
    mapFilter.classList.remove('map__filters--disabled');
    mapFilter.removeAttribute('disabled');
    popupAddressField.setAttribute('readonly', 'readonly');
  });
}

const onMainPinMoveEnd = (evt, SYMBOLS_NUMBER) => {
  popupAddressField.value = evt.target.getLatLng().lat.toFixed(SYMBOLS_NUMBER) + ', ' + evt.target.getLatLng().lng.toFixed(SYMBOLS_NUMBER);
}













export {onMapLoad, onMainPinMoveEnd};
