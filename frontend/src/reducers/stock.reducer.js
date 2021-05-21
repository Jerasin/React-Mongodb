import {
  HTTP_STOCK_FETCHING,
  HTTP_STOCK_SUCCESS,
  HTTP_STOCK_FAILED,
  HTTP_ADD_STOCK_FETCHING,
  HTTP_ADD_STOCK_SUCCESS,
  HTTP_ADD_STOCK_FAILED,
  HTTP_ADD_STOCK_DUPLICATE,
  TTP_DEIT_STOCK_FETCHING,
  TTP_DEIT_STOCK_SUCCESS,
  TTP_DEIT_STOCK_FAILED,
  HTTP_DEIT_STOCK_FETCHING,
  HTTP_DEIT_STOCK_SUCCESS,
  HTTP_DEIT_STOCK_FAILED,
} from "./../Constatns";
const initialState = {
  isGetStock: null,
  isAddStock: null,
  isEditStock: null,
  isFetching: false,
  isError: false,
  isDuplicate: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_STOCK_FETCHING:
      return {
        ...state,
        isGetStock: null,
        isAddStock: null,
        isEditStock: null,
        isFetching: true,
        isError: false,
        isDuplicate: false,
      };

    case HTTP_STOCK_SUCCESS:
      return {
        ...state,
        isGetStock: payload,
        isAddStock: null,
        isEditStock: null,
        isFetching: false,
        isError: false,
        isDuplicate: false,
      };

    case HTTP_STOCK_FAILED:
      return {
        ...state,
        isGetStock: null,
        isAddStock: null,
        isEditStock: null,
        isFetching: false,
        isError: true,
        isDuplicate: false,
      };

    case HTTP_ADD_STOCK_FETCHING:
      return {
        ...state,
        isGetStock: null,
        isAddStock: null,
        isEditStock: null,
        isFetching: true,
        isError: false,
        isDuplicate: false,
      };

    case HTTP_ADD_STOCK_SUCCESS:
      return {
        ...state,
        isGetStock: null,
        isAddStock: payload,
        isEditStock: null,
        isFetching: false,
        isError: false,
        isDuplicate: false,
      };

    case HTTP_ADD_STOCK_FAILED:
      return {
        ...state,
        isGetStock: null,
        isAddStock: null,
        isEditStock: null,
        isFetching: false,
        isError: true,
        isDuplicate: false,
      };

    case HTTP_ADD_STOCK_DUPLICATE:
      return {
        ...state,
        isGetStock: null,
        isAddStock: null,
        isEditStock: null,
        isFetching: false,
        isError: false,
        isDuplicate: true,
      };

    case HTTP_DEIT_STOCK_FETCHING:
      return {
        ...state,
        isGetStock: null,
        isAddStock: null,
        isEditStock: null,
        isFetching: true,
        isError: false,
        isDuplicate: false,
      };

    case HTTP_DEIT_STOCK_SUCCESS:
      return {
        ...state,
        isGetStock: null,
        isAddStock: null,
        isEditStock: payload,
        isFetching: false,
        isError: false,
        isDuplicate: false,
      };

    case HTTP_DEIT_STOCK_FAILED:
      return {
        ...state,
        isGetStock: null,
        isAddStock: null,
        isEditStock: null,
        isFetching: false,
        isError: true,
        isDuplicate: false,
      };

    default:
      return state;
  }
};
