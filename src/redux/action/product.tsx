export const setProductList = (list: Array<any>) =>{
    return{
        type: 'SET_PRODUCT_LIST',
        payload: list
    }
}
export const setProductHotList = (list: Array<any>) =>{
    return{
        type: 'SET_PRODUCT_HOT_LIST',
        payload: list
    }
}
export const setProductNewList = (list: Array<any>) =>{
    return{
        type: 'SET_PRODUCT_NEW_LIST',
        payload: list
    }
}