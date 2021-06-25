import {
  SET_LOADING,
  CALCULATE_CASH_WORTH,CALCULATE_STOCK_WORTH, ADD_TO_PORTFOLIO, GET_MONEY,
  BUY_SHARES_SUCCESS, BUY_SHARES_FAIL, SELL_SHARES_SUCCESS, SELL_SHARES_FAIL, 
  SET_PIE} from '../types';

const PortfolioReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {  ...state, loading: true  };
    case GET_MONEY:
      return {...state, cashWorth: action.payload}
    case ADD_TO_PORTFOLIO:
      return {
        ...state,
        portfolioStocks:  [...state.portfolioStocks, action.payload],
        loading: false, 
      } 
    case CALCULATE_STOCK_WORTH:   
      return { 
        ...state,
        stockWorth: state.portfolioStocks.reduce((a, {worth}) => a + worth, 0)
      };
    case CALCULATE_CASH_WORTH: {
      return {
        ...state,
        cashWorth: action.payload,
        worth: action.payload + state.stockWorth
      }
    }
    case SET_PIE:
      let labels = [];
      let stockWorth = [];
      state.portfolioStocks.forEach((stock) => {
        labels.push(stock.symbol);
        stockWorth.push(stock.worth);
      });
      labels.push("Cash");
      stockWorth.push(state.cashWorth);
      return {
        ...state,
        PieDatasets: {
          labels: labels,
          datasets: [
            {
              label: 'Worth',
              backgroundColor: [
                '#b3ccff',
                '#ccffff',
                '#d6f5d6',
                '#fff5cc',
                '#ffcccc',
                "#f0c2e0"
              ],
              data: stockWorth,
            },
          ],
        }
      }
    case SELL_SHARES_SUCCESS:
    case BUY_SHARES_SUCCESS:
      state.portfolioStocks.forEach(s => {
        if (s.symbol === action.payload.symbol) {
          s.numShares = action.payload.numShares;
          s.worth = s.latestPrice * s.numShares
        }
      });
      return {
        ...state,
      }
    case SELL_SHARES_FAIL:
    case BUY_SHARES_FAIL:
      console.log("Buy Shares Failed");
      return {...state}

    default:
      return state;
  }
};

export default PortfolioReducer;
