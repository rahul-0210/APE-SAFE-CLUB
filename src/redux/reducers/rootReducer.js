// ** Redux Imports
import {combineReducers} from 'redux'

// ** Reducers Imports
import wallet from './wallet'
import masterReducer from './master-reducer'
import conFlipReducer from './coin-flip-reducer'

const rootReducer = combineReducers({
    wallet,
    masterReducer,
    conFlipReducer,
})

export default rootReducer
