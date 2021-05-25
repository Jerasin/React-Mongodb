import {
  HTTP_DETAIL_SALEORDER_FETCHING,
  HTTP_DETAIL_SALEORDER_SUCCESS,
  HTTP_DETAIL_SALEORDER_FAILED,
  server,
  GET_DETAIL_SALEORDER_URL,
} from "./../Constatns";
import { httpClient } from "./../utils/HttpClient";

export const setSateGetSaleOrderDetailToFetching = () => ({
  type: HTTP_DETAIL_SALEORDER_FETCHING,
});

export const setSateGetSaleOrderDetailToSuccess = (payload) => ({
  type: HTTP_DETAIL_SALEORDER_SUCCESS,
  payload,
});

export const setSateGetSaleOrderDetailToFailed = () => ({
  type: HTTP_DETAIL_SALEORDER_FAILED,
});

export const GetSaleOrderDetail = (id , credentail) => {
  return async (dispatch) => {
    dispatch(setSateGetSaleOrderDetailToFetching());
    try {
      let result = await httpClient.post(`${server.GET_DETAIL_SALEORDER_URL}/${id}` , credentail);
      dispatch(setSateGetSaleOrderDetailToSuccess(result.data));
    } catch (err) {
      dispatch(setSateGetSaleOrderDetailToFailed());
    }
  };
};
