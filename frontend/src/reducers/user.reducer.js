import {
  HTTP_GET_USERS_FETCHING,
  HTTP_GET_USERS_SUCCESS,
  HTTP_GET_USERS_FAILED,
  HTTP_GET_USER_FETCHING,
  HTTP_GET_USER_SUCCESS,
  HTTP_GET_USER_FAILED,
} from "./../Constatns";

const initialState = {
  isFetching: null,
  isGet: null,
  isFailed: null,
  isGetById: null,
  isEdit: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_GET_USERS_FETCHING:
      return {
        ...state,
        isFetching: true,
        isGet: null,
        isFailed: false,
        isGetById: null,
        isEdit: null,
      };

    case HTTP_GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isGet: payload,
        isFailed: false,
        isGetById: null,
        isEdit: null,
      };

    case HTTP_GET_USERS_FAILED:
      return {
        ...state,
        isFetching: false,
        isGet: null,
        isFailed: true,
        isGetById: null,
        isEdit: null,
      };

      case HTTP_GET_USER_FETCHING:
      return {
        ...state,
        isFetching: true,
        isGet: null,
        isFailed: false,
        isGetById: null,
        isEdit: null,
      };

    case HTTP_GET_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isGet: null,
        isFailed: false,
        isGetById: payload,
        isEdit: null,
      };

    case HTTP_GET_USERS_FAILED:
      return {
        ...state,
        isFetching: false,
        isGet: null,
        isFailed: true,
        isGetById: null,
        isEdit: null,
      };

    default:
      return state;
  }
};
