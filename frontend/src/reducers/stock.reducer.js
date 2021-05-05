import {
  HTTP_STOCK_FETCHING,
  HTTP_STOCK_SUCCESS,
  HTTP_STOCK_FAILED,
  HTTP_ADD_STOCK_FETCHING,
  HTTP_ADD_STOCK_SUCCESS,
  HTTP_ADD_STOCK_FAILED,
  HTTP_ADD_STOCK_DUPLICATE,
} from "./../Constatns";
const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  isDuplicate: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_STOCK_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };

    case HTTP_STOCK_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };

    case HTTP_STOCK_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };

    case HTTP_ADD_STOCK_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false , isDuplicate: false };

    case HTTP_ADD_STOCK_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false , isDuplicate: false};

    case HTTP_ADD_STOCK_FAILED:
        return { ...state, result: null, isFetching: false, isError: true , isDuplicate: false};
    
    case HTTP_ADD_STOCK_DUPLICATE:
        return { ...state, result: null, isFetching: false, isError: false , isDuplicate: true};
    

    default:
      return state;
  }
};
