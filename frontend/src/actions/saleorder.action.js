import {
  HTTP_CREATE_SALEORDER_FETCHING,
  HTTP_CREATE_SALEORDER_SUCCESS,
  HTTP_CREATE_SALEORDER_FAILED,
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


export const add_SaleOrder = (history,credentail) =>{
    let fakedata = [
        {"document_Number": 11150,
          "product_Code": 1150,
          "product_Price": 2,
          "product_Stock": 3,
          "product_Name": "222",
        }
    ]
    return async (dispatch) =>{
        dispatch(setStateCreateSaleOrderToFetching());
        console.log(credentail)
        try{
            
            let result = await  httpClient.post(server.SALEORDER_URL,credentail );
            dispatch(setStateCreateSaleOrderToSuccess(result.data))
            history.goBack();

        }
        catch(err){
            dispatch(setStateCreateSaleOrderToFailed())
        }
    }

}

