import { SET_BUYSELL } from '../types';

const BuySellReducer = (state, action) => {
  switch (action.type) {
    case SET_BUYSELL:
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
};

export default BuySellReducer;
