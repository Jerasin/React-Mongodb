import {
  HTTP_GET_USERS_FETCHING,
  HTTP_GET_USERS_SUCCESS,
  HTTP_GET_USERS_FAILED,
  HTTP_GET_USER_FETCHING,
  HTTP_GET_USER_SUCCESS,
  HTTP_GET_USER_FAILED,
  HTTP_EDIT_USER_FETCHING,
  HTTP_EDIT_USER_SUCCESS,
  HTTP_EDIT_USER_FAILED,
  server,
  GET_USERS_URL,
  GET_USER_URL,
} from "./../Constatns";
import { httpClient } from "./../utils/HttpClient";

// Get Users Actions-type

export const setStateGetUsersToFetching = () => ({
  type: HTTP_GET_USERS_FETCHING,
});

export const setStateGetUsersToSuccess = (payload) => ({
  type: HTTP_GET_USERS_SUCCESS,
  payload,
});

export const setStateGetUsersToFailed = () => ({
  type: HTTP_GET_USERS_FAILED,
});

// Get User Actions-type

export const setStateGetUserToFetching = () => ({
    type: HTTP_GET_USER_FETCHING,
  });
  
  export const setStateGetUserToSuccess = (payload) => ({
    type: HTTP_GET_USER_SUCCESS,
    payload,
  });
  
  export const setStateGetUserToFailed = () => ({
    type: HTTP_GET_USER_FAILED,
  });

  // Edit User Actions-type

  export const setStateEditUserToFetching = () => ({
    type: HTTP_EDIT_USER_FETCHING,
  });
  
  export const setStateEditUserToSuccess = (payload) => ({
    type: HTTP_EDIT_USER_SUCCESS,
    payload,
  });
  
  export const setStateEditUserToFailed = () => ({
    type: HTTP_EDIT_USER_FAILED,
  });

export const getUser = (id) =>{
    return async (dispatch) => {
        dispatch(setStateGetUserToFetching());
        try {
          let result = await httpClient.get(`${server.GET_USER_URL}/${id}`);
          dispatch(setStateGetUserToSuccess(result.data));
        } catch (err) {
          dispatch(setStateGetUserToFailed());
        }
      };
}

export const getUsers = (credentail) => {
  return async (dispatch) => {
    dispatch(setStateGetUsersToFetching());
    try {
      let result = await httpClient.post(server.GET_USERS_URL, credentail);
      if (result.data.status === 401) {
        await localStorage.removeItem("localStorageID");
      }
      dispatch(setStateGetUsersToSuccess(result.data));
    } catch (err) {
      alert(JSON.stringify(err));
      dispatch(setStateGetUsersToFailed());
    }
  };
};


export const updateUser = (id,credentail) =>{
  return async dispatch => {
    dispatch(setStateEditUserToFetching())
    try{
      // console.log(id)
      console.log(credentail)
      let result = await httpClient.put(`${server.GET_USER_URL}/${id}`, credentail);
      dispatch(setStateEditUserToSuccess(result))
    }
    catch(err){
      dispatch(setStateEditUserToFailed())
    }
  }
}