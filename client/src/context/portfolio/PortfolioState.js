import React, { useReducer } from 'react';
import axios from 'axios';

import PortfolioContext from './portfolioContext';
import PortfolioReducer from './portfolioReducer';
import {
  SET_LOADING,
  CALCULATE_STOCK_WORTH,
  ADD_TO_PORTFOLIO,
  CALCULATE_CASH_WORTH,
  SET_PIE,
  BUY_SHARES_SUCCESS,
  BUY_SHARES_FAIL, 
  SELL_SHARES_SUCCESS, 
  SELL_SHARES_FAIL
} from '../types';


const ixeToken = process.env.REACT_APP_IEX_TPK;
const PortfolioState = (props) => {
  const initialState = {
    worth: 0,
    cashWorth: 0,
    stockWorth: 0,
    portfolioStocks: [],
    PieDatasets: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(PortfolioReducer, initialState);

  // Get Stocks
  const getPortfolio = async () => {
    //dispatch({ type: SET_LOADING });

    const res = await axios.get('/api/portfolio');

    state.portfolioStocks = [];
    await Promise.all(
      res.data
        .filter((stock) => stock.type === 'stock')
        .map(async (stock) => {
          const res = await axios.get(
            `https://cloud.iexapis.com/stable/stock/${stock.symbol}/quote?token=${ixeToken}`,
            {
              transformRequest: (data, headers) => {
                delete headers.common['x-auth-token'];
                return data;
              },
            }
          );

          dispatch({
            type: ADD_TO_PORTFOLIO,
            payload: {
              ...res.data,
              numShares: stock.numShares,
              worth: stock.numShares * res.data.latestPrice,
            },
          });
        })
    );
    console.log(res.data)
    // dispatch({ type: GET_PORTFOLIO });
    dispatch({ type: CALCULATE_STOCK_WORTH });
    dispatch({
      type: CALCULATE_CASH_WORTH,
      payload: res.data.find((stock) => stock.type === 'cash').numShares,
    });

    dispatch({ type: SET_PIE });
    generatePie();
  };

  // Generate Pie Chart datasets
  const generatePie = () => {
    let labels = [];
    let stockWorth = [];
    state.portfolioStocks.forEach((stock) => {
      labels.push(stock.symbol);
      stockWorth.push(stock.worth);
    });
    state.PieDatasets = {
      labels: labels,
      datasets: [
        {
          label: 'Worth',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4',
          ],
          hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F',
          ],
          data: stockWorth,
        },
      ],
    };
  };

  // Buy shares
  const buyShares = async (payload_stock, payload_cash) => {
    console.log(payload_cash, payload_stock)

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Buy stock
    try {
      const res = await axios.post(
        '/api/portfolio',
        payload_stock,
        config
      );
      dispatch({ type: BUY_SHARES_SUCCESS, payload: res.data});
    } catch (error) {
      dispatch({ type: BUY_SHARES_FAIL, payload: error.response.msg });
    }

    // Pay cash
    try {
      const res = await axios.post(
        '/api/portfolio',
        payload_cash,
        config
      );
      dispatch({ type: BUY_SHARES_SUCCESS, payload: res.data});
    } catch (error) {
      dispatch({ type: BUY_SHARES_FAIL, payload: error.response.msg });
    }
  };
  

  // Sell Shares
  const sellShares = async (payload_stock, payload_cash) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(payload_cash, payload_stock)

    // Sell stock
    try {
      const res = await axios.post(
        '/api/portfolio',
        payload_stock,
        config
      );
      dispatch({ type: SELL_SHARES_SUCCESS, payload: res.data});
    } catch (error) {
      dispatch({ type: SELL_SHARES_FAIL, payload: error.response.msg });
    }
    // Gain cash
    try {
      const res = await axios.post(
        '/api/portfolio',
        payload_cash,
        config
      );
      dispatch({ type: SELL_SHARES_SUCCESS, payload: res.data});
    } catch (error) {
      dispatch({ type: SELL_SHARES_FAIL, payload: error.response.msg });
    }
  };
  return (
    <PortfolioContext.Provider
      value={{
        portfolioStocks: state.portfolioStocks,
        worth: state.worth,
        cashWorth: state.cashWorth,
        stockWorth: state.stockWorth,
        PieDatasets: state.PieDatasets,
        getPortfolio: getPortfolio,
        generatePie: generatePie,
        sellShares: sellShares,
        buyShares: buyShares,
      }}
    >
      {props.children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioState;
