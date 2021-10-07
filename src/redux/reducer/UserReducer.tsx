import * as React from 'react'
import Cart from '../../layout/Cart/cart'
interface IUser {
    userInfor: {
        firstName: string,
        lastName: string,
        phone: number,
        gender: string,
        userId?: string,
        email: string,
        ava: string,
    },
    auth: boolean,
    cart: Array<any>,
}
const initialState: IUser ={
    userInfor: {
        firstName: '',
        lastName: '',
        phone: 0,
        gender: '',
        email: '',
        ava: '',
    },
    auth: false,
    cart: [],
}
type Action = {
    type: string,
    payload: any
}
const userReducer = (state = initialState, action: Action) =>{
    switch(action.type){
        case "SET_USER_INFOR":{
            const infor = action.payload
            return {...state, userInfor: infor}
        }
        case "USER_LOGOUT":{
            const infor = {}
            return {...state, userInfor: infor}
        }
        case "USER_LOGIN":{
            const authentication = true
            return {...state, auth: authentication}
        }
        case "SET_USER_CART":{
            const {data} = action.payload 
            return {...state, cart: [...data]}
        }
        case "INCREASE_QUANTITY":{
            const productId = action.payload
            const arr: any = []
            console.log(1)
            state.cart.map((item)=>{
                if(item._id === productId){
                    arr.push({...item, quantityInCart: item.quantityInCart + 1})
                }
                else arr.push(item)
            })
            return {...state, cart: [...arr]}
        }
        case "DECREASE_QUANTITY":{
            const productId = action.payload
            const arr: any = []
            state.cart.map((item)=>{
                if(item._id === productId){
                    arr.push({...item, quantityInCart: item.quantityInCart - 1})
                }
                else arr.push(item)
            })
            return {...state, cart: [...arr]}
        }
        case "REMOVE_ITEM":{
            const productId = action.payload
            const array = state.cart.filter((item)=>{
                if(item._id !== productId){
                    return item
                }
            })
            return {...state, cart: [...array]}
        }
        default: return {...state}
    }
}
export default userReducer