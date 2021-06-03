import React, { useReducer } from 'react';
import StockContext from './stockContext';
import stockReducer from './stockReducer';
import axios from 'axios';

import {
  SET_LOADING,
  SEARCH_STOCK,
  SET_STOCK_GRAPH_DATA,
  REMOVE_FROM_WATCHLIST,
  ADD_TO_WATCHLIST,
} from '../types';

const ixeToken = process.env.REACT_APP_IEX_TPK;
const StockState = (props) => {
  const initialState = {
    indices: [],
    stocks: [],
    stock: {},
    stockGraphData: {},
    stockGraphOptions: {},
    inWatchlist: false,
    error: null,
    loading: null,
  };

  const [state, dispatch] = useReducer(stockReducer, initialState);

  const searchSymbol = async (symbol) => {
    dispatch({ type: SET_LOADING });

    const res = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${ixeToken}`
    );

    dispatch({
      type: SEARCH_STOCK,
      payload: res.data,
    });
  };

  const getStockData = async (symbol, timeRange) => {
    dispatch({ type: SET_LOADING });

    const res = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${timeRange}?chartCloseOnly=true&token=${ixeToken}`
    );

    let graph_data = [];
    res.data.forEach((unitData) => {
      graph_data.push({
        x: timeRange === '1d' ? unitData.minute : unitData.date,
        y: unitData.close,
      });
    });

    const datas = {
      datasets: [
        {
          label: 'Stock Price',
          data: graph_data,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };

    const options = {
      scales: {
        xAxes: [
          {
            title: 'time',
            time: {
              unit: 'day',
            },
          },
        ],
      },
    };

    dispatch({
      type: SET_STOCK_GRAPH_DATA,
      payload: [datas, options],
    });
  };

  const addToWatchlist = () => {
    dispatch({ type: ADD_TO_WATCHLIST });
  };
  const removeFromWatchList = () => {
    dispatch({ type: REMOVE_FROM_WATCHLIST });
  };

  return (
    <StockContext.Provider
      value={{
        stocks: state.stocks,
        stock: state.stock,
        inWatchlist: state.inWatchlist,
        loading: state.loading,
        stockGraphData: state.stockGraphData,
        stockGraphOptions: state.stockGraphOptions,
        searchSymbol: searchSymbol,
        getStockData: getStockData,
        addToWatchlist: addToWatchlist,
        removeFromWatchList: removeFromWatchList,
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
};

export default StockState;
