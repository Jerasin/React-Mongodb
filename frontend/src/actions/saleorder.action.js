import {
  HTTP_CREATE_SALEORDER_FETCHING,
  HTTP_CREATE_SALEORDER_SUCCESS,
  HTTP_CREATE_SALEORDER_FAILED,
  HTTP_UPDATE_SALEORDER_FETCHING,
  HTTP_UPDATE_SALEORDER_SUCCESS,
  HTTP_UPDATE_SALEORDER_FAILED,
  server,
  SALEORDER_URL,
} from "../Constatns";

import { httpClient } from "../utils/HttpClient";

export const setStateCreateSaleOrderToFetching = () => ({
    type: HTTP_CREATE_SALEORDER_FETCHING,
    
})

export const setStateCreateSaleOrderToSuccess = (payload) => ({
    type: HTTP_CREATE_SALEORDER_SUCCESS,
    payload
    
})

export const setStateCreateSaleOrderToFailed = () => ({
    type: HTTP_CREATE_SALEORDER_FAILED,
})

export const setStateUpdateStockBySaleOrderToFailed = () => ({
    type: HTTP_UPDATE_SALEORDER_FAILED,
})

export const setStateUpdateStockBySaleOrderToFetching = () => ({
    type: HTTP_UPDATE_SALEORDER_FETCHING,
    
})

export const setStateUpdateStockBySaleOrderToSuccess = (payload) => ({
    type: HTTP_UPDATE_SALEORDER_SUCCESS,
    payload
    
})

export const add_SaleOrder = (credentail) =>{
    
    return async (dispatch) =>{
        dispatch(setStateCreateSaleOrderToFetching());
        try{
            
            let result = await  httpClient.post(server.SALEORDER_URL,credentail );
            dispatch(setStateCreateSaleOrderToSuccess(result.data))

        }
        catch(err){
            dispatch(setStateCreateSaleOrderToFailed())
        }
    }

}

export const update_SaleOrder = (history,credentail) =>{
    return async dispatch => {  
    dispatch(setStateUpdateStockBySaleOrderToFetching())
     try{
      
      let result = await httpClient.put(`${server.SALEORDER_URL}`,credentail);
      dispatch(setStateUpdateStockBySaleOrderToSuccess(result))
      history.push("/saleorderlist");
     }
     catch(err){
      dispatch(setStateUpdateStockBySaleOrderToFailed())
     }
    }
  }