// ** Redux, Thunk & Root Reducer Imports
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import rootReducer from '../reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'

// ** init middleware
const middleware = [thunk, createDebounce()]

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// ** Create store
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)))

export const useSelector = useReduxSelector

export const useDispatch = () => useReduxDispatch()

export { store }
