import {
  HTTP_REGISTER_FETCHING,
  HTTP_REGISTER_SUCCESS,
  HTTP_REGISTER_FAILED,
  HTTP_REGISTER_DUPLICATE,
  HTTP_REGISTER_RESET,
  server,
} from "../Constatns";

import { httpClient } from "./../utils/HttpClient";

export const setRegisterStateToFetching = () => ({
  type: HTTP_REGISTER_FETCHING,
});

export const setRegisterStateToSuccess = (payload) => ({
  type: HTTP_REGISTER_SUCCESS,
  payload,
});

export const setRegisterStateToFailed = () => ({
  type: HTTP_REGISTER_FAILED,
});

export const setRegisterStateToDuplicate = (payload) => ({
  type: HTTP_REGISTER_DUPLICATE,
  payload,
});

export const setRegisterStateToReset = () => ({
  type: HTTP_REGISTER_RESET,
});

export const reset = (history, credentail) => {
  return (dispatch) => {
    dispatch(setRegisterStateToReset());
    history.goBack();
  };
};

export const register = (history, credentail) => {
  return async (dispatch) => {
    dispatch(setRegisterStateToFetching());
    try {
      let result = await httpClient.post(server.REGISTER_URL, credentail);
      switch (result.data.status) {
        case "OK":
          dispatch(setRegisterStateToSuccess("OK"));
          setTimeout(() => {
            dispatch(setRegisterStateToReset());
            history.goBack();
          }, 1000);
          
          break;

        case "NOK":
          dispatch(setRegisterStateToFailed());
          break;

        case "Duplicate":
          dispatch(setRegisterStateToDuplicate("Duplicate"));
          break;
      }
    } catch (error) {
      console.log(error);
      dispatch(setRegisterStateToFailed());
    }
  };
};
