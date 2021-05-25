import {
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FAILED,
  server,
  TIMEOUT_CONFIG_S,
} from "./../Constatns";

import { httpClient } from "./../utils/HttpClient";
import { setRegisterStateToFailed } from "./register.action";

export const setLoginStateToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
});

export const setLoginStateToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
});

export const setLoginStateToFailed = () => ({
  type: HTTP_LOGIN_FAILED,
});

let TIMEOUT = 0;

const SetTimeOut = (TIMEOUT_CONFIG) => {
  return (TIMEOUT = TIMEOUT_CONFIG * 1000);
};

// export const autoLogin = ( test,dataUser) => {

//   let Demodata = dataUser
//     return (dispatch) => {
//       if (localStorage.getItem("status")  == "OK"){
//         dispatch(setLoginStateToSuccess(Demodata))
//       }
//     }
//   }

export const login = (history, credentail) => {
  return async (dispatch, getState) => {
    dispatch(setLoginStateToFetching());
    let result = await httpClient.post(server.LOGIN_URL, credentail);
    if (result.data.status === 404) {
      dispatch(setLoginStateToFailed());
      alert(JSON.stringify("Please Check"));
    } else {
      dispatch(
        setLoginStateToSuccess({
          status: result.data.status,
          data: result.data.result,
        })
      );

      localStorage.setItem("localStorageID", JSON.stringify(result.data.token));
      getState().appReducer.app.forceUpdate();
      history.push("/stock");
    }

    // dispatch(setRegisterStateToFailed())
  };
};
