import { createAction } from 'redux-actions';

export const choseCityStart = createAction('[ChoseCity], choseCity start');
export const choseCityDataReceived = createAction(
  '[ChoseCity], choseCityData received'
);
export const choseCityErrorOccured = createAction(
  '[ChoseCity], choseCityError occured'
);

export const storeChosenCity = chosenCity => (dispatch, getState) => {
  dispatch(choseCityStart());
  const data = chosenCity;
  const error = new Error();

  dispatch(choseCityDataReceived(data));
  dispatch(choseCityErrorOccured(error));
};
