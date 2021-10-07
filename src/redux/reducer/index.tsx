import * as React from 'react'
import {combineReducers} from 'redux'
import categoryReducer from './CategoryReducer'
import paymentReducer from './PaymentReducer'
import productReducer from './ProductReducer'
import userReducer from './UserReducer'

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    payment: paymentReducer
})
export default rootReducer

export type State = ReturnType<typeof rootReducer>