import {SET_SIDEBAR_OPEN} from '../types'

export function setSidebarOpen(isOpen) {
    return {
        type: SET_SIDEBAR_OPEN,
        status: isOpen,
    }
}
