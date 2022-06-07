import {
  MARKET_GET_REQUEST,
  MARKET_GET_SUCCESS,
  MARKET_GET_FAIL,
  CREATE_MARKET_REQUES,
  CREATE_MARKET_SUCCESS,
  CREATE_MARKET_FAIL,
  MARKETS_PENDING_GET_REQUEST,
  MARKETS_PENDING_GET_SUCCESS,
  MARKETS_PENDING_GET_FAIL,
  MARKET_PENDING_DELETE_REQUEST,
  MARKET_PENDING_GET_SUCCESS,
  MARKET_PENDING_GET_REQUEST,
  MARKET_PENDING_GET_FAIL,
  MARKET_PENDING_DELETE_SUCCESS,
  MARKET_PENDING_DELETE_FAIL,
  MARKET_PENDING_LIVE_REQUEST,
  MARKET_PENDING_LIVE_SUCCESS,
  MARKET_PENDING_LIVE_FAIL,
} from "../constants/marketConstants";

export const marketReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_GET_REQUEST:
      return { ...state, loading: true };
    case MARKET_GET_SUCCESS:
      return { loading: false, market: action.payload };
    case MARKET_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createMarketReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MARKET_REQUES:
      return { ...state, loading: true };
    case CREATE_MARKET_SUCCESS:
      return {
        loading: false,
        market: action.payload,
      };
    case CREATE_MARKET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const storesPendingReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKETS_PENDING_GET_REQUEST:
      return { ...state, loading: true };
    case MARKETS_PENDING_GET_SUCCESS:
      return {
        loading: false,
        markets: action.payload,
      };
    case MARKETS_PENDING_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const storePendingReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_PENDING_GET_REQUEST:
      return { ...state, loading: true };
    case MARKET_PENDING_GET_SUCCESS:
      return { loading: false, market: action.payload };
    case MARKET_PENDING_GET_FAIL:
      return { loading: false, error: action.payload };
    case MARKET_PENDING_DELETE_REQUEST:
      return { ...state, loading: true };
    case MARKET_PENDING_DELETE_SUCCESS:
      return { loading: false, message: "Store deleted" };
    case MARKET_PENDING_DELETE_FAIL:
      return { ...state, loading: false };
    case MARKET_PENDING_LIVE_REQUEST:
      return { ...state, loading: true };
    case MARKET_PENDING_LIVE_SUCCESS:
      return { market: action.payload, loading: false };
    case MARKET_PENDING_LIVE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
