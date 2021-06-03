import React, { useReducer } from 'react';
import PortfolioContext from './portfolioContext';
import PortfolioReducer from './portfolioReducer';
import axios from 'axios';

import {} from '../types';

const PortfolioState = (props) => {
  const initialState = {
    worth: 0,
    portfolioStocks: [],
    portfolioGraphData: {},
    portfolioGraphOptions: {},
  };

  const [state, dispatch] = useReducer(PortfolioReducer, initialState);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioStocks: state.portfolioStocks,
        worth: state.worth,
        portfolioGraphData: state.portfolioGraphData,
        portfolioGraphOptions: state.portfolioGraphOptions,
      }}
    >
      {props.children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioState;
