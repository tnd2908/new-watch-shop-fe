
export const setCategories = (list: Array<any>) =>{
    return{
        type: 'SET_CATEGORY',
        payload: list
    }
}
export const setCategoriesForMen = (list: Array<any>) =>{
    return{
        type: 'SET_CATEGORY_FOR_MEN',
        payload: list
    }
}
export const setCategoriesForWomen = (list: Array<any>) =>{
    return{
        type: 'SET_CATEGORY_FOR_WOMEN',
        payload: list
    }
}