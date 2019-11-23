import { createAction } from 'redux-actions';

export const fetchLocalWeatherStart = createAction(
  '[FetchLocalWeather], fetchLocalWeather start'
);
export const fetchLocalWeatherDataReceived = createAction(
  '[FetchLocalWeather], fetchLocalWeatherData received'
);
export const fetchLocalWeatherErrorOccured = createAction(
  '[FetchLoacalWeather], fetchLoacalWeatherError occured'
);

export const loadLocalWeather = (url, foundCity) => (dispatch, getState) => {
  dispatch(fetchLocalWeatherStart());
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.json();
    })
    .then(wdata => {
      let data = { data: wdata.data.current_condition[0], foundCity };

      dispatch(fetchLocalWeatherDataReceived(data));
    })
    .catch(error => {
      dispatch(fetchLocalWeaterErrorOccured(error));
    });
};
