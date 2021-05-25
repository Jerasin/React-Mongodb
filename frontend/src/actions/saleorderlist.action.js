import {
  HTTP_CREATE_SALEORDERLIST_FETCHING,
  HTTP_CREATE_SALEORDERLIST_SUCCESS,
  HTTP_CREATE_SALEORDERLIST_FAILED,
  HTTP_GET_SALEORDERLIST_FETCHING,
  HTTP_GET_SALEORDERLIST_SUCCESS,
  HTTP_GET_SALEORDERLIST_FAILED,
  server,
  SALEORDERLIST_URL,
  GET_SALEORDERLIST_URL,
} from "../Constatns";
import { httpClient } from "./../utils/HttpClient";

export const setStateCreateSaleOrderListToFetching = () => ({
  type: HTTP_CREATE_SALEORDERLIST_FETCHING,
});

export const setStateCreateSaleOrderListToSuccess = (payload) => ({
  type: HTTP_CREATE_SALEORDERLIST_SUCCESS,
  payload,
});

export const setStateCreateSaleOrderListToFailed = () => ({
  type: HTTP_CREATE_SALEORDERLIST_FAILED,
});

export const setStateGetSaleOrderListToFailed = () => ({
  type: HTTP_GET_SALEORDERLIST_FAILED,
});

export const setStateGetSaleOrderListToFetching = () => ({
  type: HTTP_GET_SALEORDERLIST_FETCHING,
});

export const setStateGetSaleOrderListToSuccess = (payload) => ({
  type: HTTP_GET_SALEORDERLIST_SUCCESS,
  payload,
});

export const create_SaleOrderList = (credentail) => {
  return async (dispatch) => {
    dispatch(setStateCreateSaleOrderListToFetching());
    try {
      let result = await httpClient.post(server.SALEORDERLIST_URL, credentail);
      dispatch(setStateCreateSaleOrderListToSuccess(result.data));
    } catch (err) {
      dispatch(HTTP_CREATE_SALEORDERLIST_FAILED());
    }
  };
};

// Use Role Users
export const getSaleOrderList = (credentail) => {
  return (dispatch) => {
    dispatch(setStateGetSaleOrderListToFetching());
    doGetSaleOrderList(dispatch, credentail);
  };
};

const doGetSaleOrderList = async (dispatch, credentail) => {
  try {
    let result = await httpClient.post(server.GET_USER_SALEORDERLIST_URL, credentail);
    if (result.data.status === 401) {
      await localStorage.removeItem("localStorageID");
    }
    dispatch(setStateGetSaleOrderListToSuccess(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    dispatch(setStateGetSaleOrderListToFailed());
  }
};

// Use Role Admin
export const getSaleOrderLists = (credentail) => {
    return (dispatch) => {
      dispatch(setStateGetSaleOrderListToFetching());
      doGetSaleOrderLists(dispatch, credentail);
    };
  };
  
  const doGetSaleOrderLists = async (dispatch, credentail) => {
    try {
      let result = await httpClient.post(server.GET_ADMIN_SALEORDERLIST_URL, credentail);
      if (result.data.status === 401) {
        await localStorage.removeItem("localStorageID");
      }
      dispatch(setStateGetSaleOrderListToSuccess(result.data));
    } catch (err) {
      alert(JSON.stringify(err));
      dispatch(setStateGetSaleOrderListToFailed());
    }
  };