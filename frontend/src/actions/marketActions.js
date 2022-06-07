import axios from "axios";
import { host } from "../constants/host";

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
  MARKET_PENDING_GET_REQUEST,
  MARKET_PENDING_DELETE_SUCCESS,
  MARKET_PENDING_DELETE_FAIL,
  MARKET_PENDING_DELETE_REQUEST,
  MARKET_PENDING_LIVE_REQUEST,
  MARKET_PENDING_LIVE_SUCCESS,
  MARKET_PENDING_LIVE_FAIL,
  MARKET_PENDING_GET_SUCCESS,
  MARKET_PENDING_GET_FAIL,
} from "../constants/marketConstants";

export const getMarketInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: MARKET_GET_REQUEST });

    const { data } = await axios.get(`${host}/api/stores/store/${id}`);
    dispatch({
      type: MARKET_GET_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: MARKET_GET_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const createMarket = (market) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_MARKET_REQUES });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${host}/api/stores`, market, config);

    dispatch({
      type: CREATE_MARKET_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: CREATE_MARKET_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const getStoresPendingCreate = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MARKETS_PENDING_GET_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${host}/api/stores/store-pending`, {}, config);
    dispatch({
      type: MARKETS_PENDING_GET_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: MARKETS_PENDING_GET_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const getStorePendingCreate = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARKET_PENDING_GET_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${host}/api/stores/store-pending/${id}`,
      {},
      config
    );
    dispatch({
      type: MARKET_PENDING_GET_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: MARKET_PENDING_GET_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const deleteStorePendingCreate = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARKET_PENDING_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `${host}/api/stores/store-pending/${id}`,
      {},
      config
    );
    dispatch({
      type: MARKET_PENDING_DELETE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: MARKET_PENDING_DELETE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const successStorePendingCreate = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARKET_PENDING_LIVE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.patch(
      `${host}/api/stores/store-pending/${id}`,
      {},
      config
    );
    dispatch({
      type: MARKET_PENDING_LIVE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: MARKET_PENDING_LIVE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
