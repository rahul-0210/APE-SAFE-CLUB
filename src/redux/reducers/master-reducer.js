import {SET_SIDEBAR_OPEN} from '../types'

const masterReducer = (
    state = {
        sidebarOpen: false,
    },
    action
) => {
    switch (action.type) {
        case SET_SIDEBAR_OPEN:
            return {...state, sidebarOpen: action.status}
        default:
            return state
    }
}

export default masterReducer
