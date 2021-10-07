import { Modal, notification } from "antd"

export const addToLocalStorage = (item: any) =>{
    const {_id, name, quantity, price, images, saleOf} = item
    if(localStorage.getItem('cart')){
        const cart = JSON.parse(localStorage.getItem("cart")!)
        const condition = cart.some((watch: any)=> watch._id === item._id)
        console.log(condition)
        if(condition){
            cart.map((watch: any)=>{
                if(watch._id === item._id){
                    return watch.quantityInCart = watch.quantityInCart + 1
                }
                else return
            })
            notification['success']({
                message: 'Add success',
                description: 'Updated quantity in your cart. Click on your shopping bag to start your payment'
            })
        }
        else {
            cart.push({name, price, quantity, images, quantityInCart: 1, _id, saleOf})
            notification['success']({
                message: 'Add success',
                description: 'Added this item to your cart. Click on your shopping bag to start your payment'
            })
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    else {
        const cart = []
        cart.push(item)
        localStorage.setItem('cart', JSON.stringify(cart))
        notification['success']({
            message: 'Add success',
            description: 'Added this item to your cart. Click on your shopping bag to start your payment'
        })
    }
}
export const removeFromLocalStorage = (id: any) =>{
    if(localStorage.getItem('cart')){
        const filter = JSON.parse(localStorage.getItem('cart')!).filter((item: any)=> item._id !== id)
        localStorage.setItem('cart', JSON.stringify(filter))
    }
}