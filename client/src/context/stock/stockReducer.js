import {
  SET_LOADING,
  SEARCH_STOCK,
  SET_STOCK_GRAPH_DATA,
  REMOVE_FROM_WATCHLIST,
  ADD_TO_WATCHLIST,
  WATCHLIST_ERROR,
  CLEAR_STOCKS,
} from '../types';

const StockReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_STOCKS:
      return { ...state, stocks: [] };
    case SEARCH_STOCK:
      return {
        ...state,
        stock: action.payload,
        loading: false,
        inWatchlist: state.stocks.find(
          (s) => s.symbol === action.payload.symbol
        )
          ? true
          : false,
      };
    case SET_STOCK_GRAPH_DATA:
      return {
        ...state,
        stockGraphData: action.payload[0],
        stockGraphOptions: action.payload[1],
        loading: false,
      };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        stocks: state.stocks.filter((s) => s.symbol !== state.stock.symbol),
        inWatchlist: false,
        loading: false,
      };
    case ADD_TO_WATCHLIST:
      return {
        ...state,
        stocks: [...state.stocks, state.stock].sort((a, b) =>
          a.symbol > b.symbol ? 1 : -1
        ),
        inWatchlist: true,
        loading: false,
      };
    case WATCHLIST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default StockReducer;
