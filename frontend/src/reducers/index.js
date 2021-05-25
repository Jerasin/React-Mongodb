import {combineReducers} from 'redux'  
import registerReducer from './register.reducer'
import loginReducer from './login.reducer'
import appReducer from './app.reducer'
import stockReducer from './stock.reducer'
import saleorderReducer from './saleorder.reducer'
import saleorderlistReducer from './saleorderlist.reducer'
import saleorderdetailReducer from './saleorderdetail.reducer';
import userReducer from './user.reducer';

export default combineReducers({registerReducer , loginReducer , appReducer ,stockReducer , saleorderReducer , saleorderlistReducer , saleorderdetailReducer , userReducer});