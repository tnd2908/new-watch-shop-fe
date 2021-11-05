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
export const setUserCart = (data: []) =>{
    return{
        type: 'SET_USER_CART',
        payload: {data}
    }
}
export const increase = (productId: string) =>{
    return{
        type: 'INCREASE_QUANTITY',
        payload: productId
    }
}
export const decrease = (productId: string) =>{
    return{
        type: 'DECREASE_QUANTITY',
        payload: productId
    }
}
export const remove = (productId: string) =>{
    return{
        type: 'REMOVE_ITEM',
        payload: productId
    }
}