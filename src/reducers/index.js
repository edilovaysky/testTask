import { combineReducers } from 'redux';

import { fetchLocalWeatherReducer } from './fetchLocalWeather';
import { choseCityReducer } from './choseCity';

export const rootReducer = combineReducers({
  fetchLocalWeather: fetchLocalWeatherReducer,
  choseCity: choseCityReducer,
});
