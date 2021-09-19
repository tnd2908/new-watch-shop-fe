import * as React from 'react'
interface IUser {
    userInfor: {
        firstName: string,
        lastName: string,
        phone: number,
        gender: string,
        userId?: string,
        email: string,
        ava: string
    },
    auth: boolean
}
const initialState: IUser ={
    userInfor: {
        firstName: '',
        lastName: '',
        phone: 0,
        gender: '',
        email: '',
        ava: ''
    },
    auth: false
}
type Action = {
    type: string,
    payload: any
}
const userReducer = (state = initialState, action: Action) =>{
    switch(action.type){
        case "SET_USER_INFOR":{
            const infor = action.payload
            console.log(infor)
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
        default: return {...state}
    }
}
export default userReducer