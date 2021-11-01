import * as React from 'react'
interface IUser {
    userInfor: {
        name: string,
        phone: number,
        userId?: string,
        email: string,
        address: string
    },
    step: number,
    cart: Array<any>,
    total: number,
    delivery: number
}
const initialState: IUser ={
    userInfor: {
        name: '',
        phone: 0,
        email: '',
        address: ''
    },
    step: 0,
    cart: [],
    total: 0,
    delivery: 0
}
type Action = {
    type: string,
    payload: any
}
const paymentReducer = (state = initialState, action: Action) =>{
    switch(action.type){
        case "SET_PAYMENT_INFOR":{
            const {infor, list} = action.payload
            return {...state, userInfor: infor, cart: [...list]}
        }
        case "SET_TOTAL":{
            const price = action.payload
            return {...state, total: price}
        }
        case "SET_DELIVERY":{
            const price = action.payload
            return {...state, delivery: price}
        }
        default: return {...state}
    }
}
export default paymentReducer