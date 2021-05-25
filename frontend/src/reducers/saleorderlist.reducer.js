import {
  HTTP_CREATE_SALEORDERLIST_FETCHING,
  HTTP_CREATE_SALEORDERLIST_SUCCESS,
  HTTP_CREATE_SALEORDERLIST_FAILED,
  HTTP_GET_SALEORDERLIST_FETCHING,
  HTTP_GET_SALEORDERLIST_SUCCESS,
  HTTP_GET_SALEORDERLIST_FAILED,
} from "../Constatns";

const initialState = {
  isFetching: null,
  isGet: null,
  isCreate: null,
  isUpdate: null,
  isFailed: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_CREATE_SALEORDERLIST_FETCHING:
      return {
        ...state,
        isFetching: true,
        isGet: null,
        isCreate: false,
        isUpdate: null,
        isFailed: false,
      };

    case HTTP_CREATE_SALEORDERLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isGet: null,
        isCreate: payload,
        isUpdate: null,
        isFailed: false,
      };

    case HTTP_CREATE_SALEORDERLIST_FAILED:
      return {
        ...state,
        isFetching: false,
        isGet: null,
        isCreate: null,
        isUpdate: null,
        isFailed: true,
      };

      case HTTP_GET_SALEORDERLIST_FETCHING:
      return {
        ...state,
        isFetching: true,
        isGet: null,
        isCreate: false,
        isUpdate: null,
        isFailed: false,
      };

    case HTTP_GET_SALEORDERLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isGet: payload,
        isCreate: null,
        isUpdate: null,
        isFailed: false,
      };

    case HTTP_GET_SALEORDERLIST_FAILED:
      return {
        ...state,
        isFetching: false,
        isGet: null,
        isCreate: null,
        isUpdate: null,
        isFailed: true,
      };


    default:
      return state;
  }
};
