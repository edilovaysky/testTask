import { handleActions } from 'redux-actions';

import {
  fetchLocalWeatherStart,
  fetchLocalWeatherDataReceived,
  fetchLocalWeatherErrorOccured,
} from 'actions/fetchLocalWeather';

const initialState = {
  loading: false,
  error: false,
  entries: {},
};

export const fetchLocalWeatherReducer = handleActions(
  {
    [fetchLocalWeatherStart]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [fetchLocalWeatherDataReceived]: (state, action) => {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        entries: data,
      };
    },
    [fetchLocalWeatherErrorOccured]: state => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },
  },
  initialState
);
