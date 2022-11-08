// ** Redux Imports
import {combineReducers} from 'redux'

// ** Reducers Imports
import wallet from './wallet'
import masterReducer from './master-reducer'

const rootReducer = combineReducers({
    wallet,
    masterReducer,
})

export default rootReducer
