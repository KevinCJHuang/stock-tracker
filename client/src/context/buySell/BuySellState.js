import React, { useReducer } from 'react';
import axios from 'axios';

import BuySellContext from './buySellContext';
import BuySellReducer from './buySellReducer';
import { SET_BUYSELL } from '../types';

const ixeToken = process.env.REACT_APP_IEX_TPK;
const BuySellState = (props) => {
  const initialState = {
    activeTab: 'Buy',
  };

  const [state, dispatch] = useReducer(BuySellReducer, initialState);

  // Sell Shares
  const set_buySell = (activeTab) => {
    dispatch({
      type: SET_BUYSELL,
      payload: activeTab,
    });
  };

  return (
    <BuySellContext.Provider
      value={{
        activeTab: state.activeTab,
        set_buySell: set_buySell,
      }}
    >
      {props.children}
    </BuySellContext.Provider>
  );
};

export default BuySellState;
