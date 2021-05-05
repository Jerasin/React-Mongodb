import { HTTP_REGISTER_FETCHING, HTTP_REGISTER_SUCCESS ,HTTP_REGISTER_FAILED , HTTP_REGISTER_DUPLICATE , HTTP_REGISTER_RESET } from "../Constatns"

const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    isDuplicate: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case HTTP_REGISTER_FETCHING:
        return { ...state , result: null , isFetching: true , isError: false , isDuplicate: false }

    case HTTP_REGISTER_SUCCESS:
        return { ...state , result: payload , isFetching: false , isError: false , isDuplicate: false }

    case HTTP_REGISTER_FAILED:
        return { ...state , result: null , isFetching: false , isError: true , isDuplicate: false }

    case HTTP_REGISTER_DUPLICATE:
            return { ...state , result: null , isFetching: false , isError: false , isDuplicate: true }

    case HTTP_REGISTER_RESET:
                return { initialState }

    default:
        return state
    }
}
