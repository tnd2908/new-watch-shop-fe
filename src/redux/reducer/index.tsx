import * as React from 'react'
import {combineReducers} from 'redux'
import userReducer from './UserReducer'

const rootReducer = combineReducers({
    user: userReducer,
})
export default rootReducer

export type State = ReturnType<typeof rootReducer>