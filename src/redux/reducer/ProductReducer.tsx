import { Action } from "../../Util/spec"

const initialState ={
    productHotList: [],
    productList: [],
    productNewList: []
}

const productReducer = (state = initialState, action: Action) =>{
    switch(action.type){
        case "SET_PRODUCT_LIST":{
            const list = action.payload
            return {...state, productList: list}
        }
        case "SET_PRODUCT_HOT_LIST":{
            const list = action.payload
            return {...state, productHotList: list}
        }
        case "SET_PRODUCT_NEW_LIST":{
            const list = action.payload
            return {...state, productNewList: list}
        }
        default: return {...state}
    }
}
export default productReducer