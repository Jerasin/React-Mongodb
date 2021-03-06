import {
  HTTP_CREATE_SALEORDER_FAILED,
  HTTP_CREATE_SALEORDER_FETCHING,
  HTTP_CREATE_SALEORDER_SUCCESS,
  HTTP_UPDATE_SALEORDER_SUCCESS,
  HTTP_UPDATE_SALEORDER_FETCHING,
  HTTP_UPDATE_SALEORDER_FAILED,
} from "./../Constatns";

const initialState = {
  isFetching: null,
  isCreate: null,
  isUpdate: null,
  isFailed: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_CREATE_SALEORDER_FETCHING:
      return {
        ...state,
        isFetching: true,
        isCreate: false,
        isUpdate: null,
        isFailed: false,
      };

    case HTTP_CREATE_SALEORDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isCreate: payload,
        isUpdate: null,
        isFailed: false,
      };

    case HTTP_CREATE_SALEORDER_FAILED:
      return {
        ...state,
        isFetching: false,
        isCreate: null,
        isUpdate: null,
        isFailed: true,
      };

    case HTTP_UPDATE_SALEORDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isCreate: null,
        isUpdate: payload,
        isFailed: false,
      };

    case HTTP_UPDATE_SALEORDER_FETCHING:
      return {
        ...state,
        isFetching: true,
        isCreate: null,
        isUpdate: null,
        isFailed: false,
      };

    case HTTP_UPDATE_SALEORDER_FAILED:
      return {
        ...state,
        isFetching: false,
        isCreate: null,
        isUpdate: null,
        isFailed: true,
      };

    default:
      return state;
  }
};
