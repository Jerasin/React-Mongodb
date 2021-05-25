import {
  HTTP_DETAIL_SALEORDER_FETCHING,
  HTTP_DETAIL_SALEORDER_SUCCESS,
  HTTP_DETAIL_SALEORDER_FAILED,
  server,
  GET_DETAIL_SALEORDER_URL,
} from "./../Constatns";

const initialState = {
  isFetching: null,
  isGet: null,
  isFailed: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DETAIL_SALEORDER_FETCHING:
      return { ...state, isFetching: true, isGet: null, isFailed: false };

    case HTTP_DETAIL_SALEORDER_SUCCESS:
      return { ...state, isFetching: false, isGet: payload, isFailed: false };

    case HTTP_DETAIL_SALEORDER_FAILED:
      return { ...state, isFetching: false, isGet: null, isFailed: true };
    default:
      return state;
  }
};
