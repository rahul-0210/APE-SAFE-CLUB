import {SET_SIDEBAR_OPEN, SET_LOADER_DISPLAY} from '../types'

const masterReducer = (
    state = {
        sidebarOpen: false,
        isLoaderOpen: false,
        reloadWarning: false,
    },
    action
) => {
    switch (action.type) {
        case SET_SIDEBAR_OPEN:
            return {...state, sidebarOpen: action.status}
        case SET_LOADER_DISPLAY:
            return Object.assign({}, state, {
                isLoaderOpen: action.isLoaderOpen,
                reloadWarning: action.reloadWarning,
            })
        default:
            return state
    }
}

export default masterReducer
