import {
  HTTP_STOCK_FETCHING,
  HTTP_STOCK_SUCCESS,
  HTTP_STOCK_FAILED,
  HTTP_ADD_STOCK_FETCHING,
  HTTP_ADD_STOCK_SUCCESS,
  HTTP_ADD_STOCK_FAILED,
  HTTP_ADD_STOCK_DUPLICATE,
  HTTP_DEIT_STOCK_FETCHING,
  HTTP_DEIT_STOCK_SUCCESS,
  HTTP_DEIT_STOCK_FAILED,
  server,
  PRODUCTS_URL,
  PRODUCTS_SLICE_URL
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

export const setStateAddStockToDuplicate = (payload) => ({
  type: HTTP_ADD_STOCK_DUPLICATE,
  payload
})

export const setStateEditStockToFetching = () => ({
  type: HTTP_DEIT_STOCK_FETCHING,
})

export const setStateEditStockToSuccess = (payload) => ({
  type: HTTP_DEIT_STOCK_SUCCESS,
  payload
})

export const setStateEditStockToFailed = () => ({
  type: HTTP_DEIT_STOCK_FAILED,
})

export const getProducts = (credentail) =>{
    return (dispatch) =>{

        dispatch(setStateStockToFetching());
        doGetProducts(dispatch , credentail);

    }
}

export const getProductById = (id) => {
  return async dispatch => {
    dispatch(setStateEditStockToFetching())   
    let  result = await httpClient.get(`${server.PRODUCTS_URL}/${id}`);
    dispatch(setStateEditStockToSuccess(result.data))   
  }
}

const doGetProducts = async (dispatch , credentail) =>{
    try{
        let result = await httpClient.post(server.PRODUCTS_SLICE_URL, credentail);
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
    await doGetProducts(dispatch,{page:1 ,limit: 5})
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
          dispatch(setStateAddStockToDuplicate("Duplicate"));
          break;
      }
  }catch(err){
      dispatch(setStateStockToFailed());
  }
  }
} 

export const updateProduct = (history,id ,credentail) =>{
  return async dispatch => {  
   try{
    // dispatch(setStateEditStockToFetching())
    let result = await httpClient.put(`${server.PRODUCTS_URL}/${id}`,credentail);
    dispatch(setStateEditStockToSuccess(result))
    // history.goBack();
    await doGetProducts(dispatch,{page:1 ,limit: 5})
   }
   catch(err){
    dispatch(setStateEditStockToFailed())
   }
  }
}