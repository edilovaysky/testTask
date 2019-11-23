import { handleActions } from 'redux-actions';

import {
  choseCityStart,
  choseCityDataReceived,
  choseCityErrorOccured,
} from 'actions/choseCity';

const initialState = {
  loading: false,
  error: false,
  entries: { city: [] },
};

export const choseCityReducer = handleActions(
  {
    [choseCityStart]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [choseCityDataReceived]: (state, action) => {
      const newdata = action.payload;
      let data = state.entries;
      data.push(newdata);
      return {
        ...state,
        loading: false,
        entries: data,
      };
    },
    [choseCityErrorOccured]: state => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },
  },
  initialState
);
