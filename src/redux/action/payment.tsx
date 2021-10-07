import * as React from 'react'

export const setNextStep = () =>{
    return{
        type: 'NEXT_STEP'
    }
}
export const setPrevStep = () =>{
    return{
        type: 'PREV_STEP'
    }
}
export const setStepOne = () =>{
    return{
        type: 'SET_STEP_1'
    }
}
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
