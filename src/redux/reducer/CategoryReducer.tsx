import * as React from 'react'

const initialState ={
    categoriesForMen: [],
    categoriesForWomen: [],
    categories: []
}
type Action = {
    type: string,
    payload: any
}
const categoryReducer = (state = initialState, action: Action) =>{
    switch(action.type){
        case "SET_CATEGORY":{
            const list = action.payload
            return {...state, categories: list}
        }
        case "SET_CATEGORY_FOR_MEN":{
            const list = action.payload
            return {...state, categoriesForMen: list}
        }
        case "SET_CATEGORY_FOR_WOMEN":{
            const list = action.payload
            return {...state, categoriesForWomen: list}
        }
        default: return {...state}
    }
}
export default categoryReducer