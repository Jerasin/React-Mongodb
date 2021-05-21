import {APP_INIT} from './../Constatns'
import {httpClient} from './../utils/HttpClient'



export const setStateApp = (app) => ({
    type: APP_INIT,
    payload: app
})






export const setApp = (app) => {
    return dispatch =>{
        dispatch(
            setStateApp(app)
        )
    }
}






