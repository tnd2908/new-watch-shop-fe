import {  Detail } from "../Util/spec";
export interface IOrder {
    getPrice(): number
}
export class Order implements IOrder {
    constructor(
        private cart: Array<Detail>,
    ){}
    public getPrice(): number {
        let totalPrice = 0
        this.cart.forEach((item: Detail) => {
            if(item.saleOf !== 0)
            totalPrice = totalPrice + item.price * (100 - item.saleOf)/100
            else
            totalPrice = totalPrice +item.price 
        })
        return totalPrice
    }
}
abstract class Service implements IOrder{
    private invoice: IOrder
    constructor(invoice: IOrder){
        this.invoice = invoice
    }
    public getPrice(): number {
        return this.invoice.getPrice()
    }
}
export class StandardDelivery extends Service{
    constructor(invoice: IOrder, public cost: number = 0){
        super(invoice)
    }
    public getPrice(): number {
        return super.getPrice() + this.cost
    }
}
export class FastDelivery extends Service{
    constructor(invoice: IOrder, public cost: number = 10){
        super(invoice)
    }
    public getPrice(): number {
        return super.getPrice() + this.cost
    }
}
export class Insurance extends Service{
    constructor(invoice: IOrder, public cost: number =  70){
        super(invoice)
    }
    public getPrice(): number {
        return super.getPrice() + 0
    }
}