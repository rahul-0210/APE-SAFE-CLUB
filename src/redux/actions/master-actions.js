import {SET_SIDEBAR_OPEN, SET_LOADER_DISPLAY} from '../types'

export function setSidebarOpen(isOpen) {
    return {
        type: SET_SIDEBAR_OPEN,
        status: isOpen,
    }
}

export function setLoaderDisplay(isLoaderOpen, reloadWarning){ 
    return{
        type: SET_LOADER_DISPLAY,
        isLoaderOpen: isLoaderOpen,
        reloadWarning: reloadWarning
    }
}