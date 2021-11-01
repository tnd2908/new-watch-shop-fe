import * as React from 'react'

export const setTotal = (total: number) =>{
    return{
        type: 'SET_TOTAL',
        payload: total
    }
}
export const setDelivery = (delivery: number) =>{
    return{
        type: 'SET_DELIVERY',
        payload: delivery
    }
}
export const setPaymentInfor = (list: Array<any>, infor: any) =>{
    return{
        type: 'SET_PAYMENT_INFOR',
        payload: {list, infor}
    }
}
