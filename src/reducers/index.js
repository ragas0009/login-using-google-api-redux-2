import { combineReducers } from 'redux'
import googleReducer from './googleReducer'
import facebookReducer from './facebookReducer'
import instagramReducer from './instagramReducer'
import userReducer from './userReducer'

export default combineReducers({
    googleReducer,
    facebookReducer,
    instagramReducer,
    userReducer
})