import {APP_INIT} from './../Constatns'

export const setStateTosetApp = (app) => ({
    type: APP_INIT,
    payload: app
})


export const setApp = (app) => {
    return dispatch =>{
        dispatch(
            setStateTosetApp(app)
        )
    }
}




