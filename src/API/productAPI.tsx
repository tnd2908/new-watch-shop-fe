import axios from "axios"
import { API_URL } from "./API"
import querystring from 'query-string'

class ProductAPI {
    getColor = async () =>{
        try {
            const res = await axios.get(`${API_URL}/color`)
            if(res.data.success == true)
            return res.data.data
        } catch (error) {
            console.log(error)
        }
    }
    getProduct = async (page: number) =>{
        try {
            const res = await axios.get(`${API_URL}/product?page=${page}`)
            if(res.data.success == true)
            return res.data.data
        } catch (error) {
            console.log(error)
        }
    }
    getCategory  = async () =>{
        try {
            const res = await axios.get(`${API_URL}/category`)
            if(res.data.success == true)
            return res.data.data.categories
        } catch (error) {
            console.log(error)
        }
    }
    queryProduct = async (data: {}) =>{
        try {
            const res = await axios.get(`${API_URL}/product/query?${querystring.stringify(data)}`)
            if(res.data.success == true){
                return {
                    data: res.data.data,
                    totalPage: res.data.totalPage
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
const productAPI = new ProductAPI()
export default productAPI
