import {
  HTTP_STOCK_FETCHING,
  HTTP_STOCK_SUCCESS,
  HTTP_STOCK_FAILED,
  HTTP_ADD_STOCK_FETCHING,
  HTTP_ADD_STOCK_SUCCESS,
  HTTP_ADD_STOCK_FAILED,
  HTTP_ADD_STOCK_DUPLICATE,
  server,
  PRODUCTS_URL
} from "./../Constatns";
import { httpClient } from "./../utils/HttpClient";

export const setStateStockToFetching = () => ({
  type: HTTP_STOCK_FETCHING,
});

export const setStateStockToSucess = (payload) => ({
  type: HTTP_STOCK_SUCCESS,
  payload,
});

export const setStateStockToFailed = () => ({
  type: HTTP_STOCK_FAILED,
});

export const setStateAddStockToFetching = () => ({
  type: HTTP_ADD_STOCK_FETCHING,
})

export const setStateAddStockToSuccess = (payload) => ({
  type: HTTP_ADD_STOCK_SUCCESS,
  payload
})

export const setStateAddStockToFailed = () => ({
  type: HTTP_ADD_STOCK_FAILED,
})

export const setStateAddStockToDuplicate = () => ({
  type: HTTP_ADD_STOCK_DUPLICATE,
})

export const getProducts = () =>{
    return (dispatch) =>{

        dispatch(setStateStockToFetching());
        doGetProducts(dispatch);

    }
}

const doGetProducts = async (dispatch) =>{
    try{
        let result = await httpClient.get(server.PRODUCTS_URL);
        if(result.data.status === 401){
        await  localStorage.removeItem("localStorageID")
        }
        dispatch(setStateStockToSucess(result.data))
    }catch(err){
        alert(JSON.stringify(err));
        dispatch(setStateStockToFailed());
    }
}

export const deleteProduct =  (id) =>{
  return async dispatch => {  
    dispatch(setStateStockToFetching())
    await httpClient.delete(`${server.PRODUCTS_URL}/${id}`);
    await doGetProducts(dispatch)
  }
}

export const addProduct = (history , credentail) => {
  return async dispatch =>{
    dispatch(setStateAddStockToFetching())
    console.log(credentail)
    try{
      console.log("Process Running")
      let result = await httpClient.post(server.PRODUCTS_URL , credentail);
      alert(JSON.stringify(result.data.status))
      switch (result.data.status) {
        case "OK":
          dispatch(setStateAddStockToSuccess(result.data.message));
          history.goBack();
          break;

        case "NOK":
          dispatch(setStateAddStockToFailed());
          break;
          
        case "Duplicate":
          dispatch(setStateAddStockToDuplicate());
          break;
      }
  }catch(err){
      // alert(JSON.stringify(err));
      dispatch(setStateStockToFailed());
  }
  }
} 