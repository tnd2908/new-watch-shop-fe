import * as React from 'react'
interface IUser{
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    gender: string,
    userId?: string,
    ava: string
}
export const setUserInfor = (infor: IUser) =>{
    return{
        type: 'SET_USER_INFOR',
        payload: infor
    }
}
export const userLogout = () =>{
    return{
        type: 'USER_LOGOUT'
    }
}
export const userLogin = () =>{
    return{
        type: 'USER_LOGIN'
    }
}