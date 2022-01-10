import { CartList } from "../Util/spec";
interface IBilling{
    getPrice(quantity: number, price: number, saleOf?:number): number
}
export class NormalItem implements IBilling{
    getPrice(quantity: number, price: number): number {
        return price * quantity 
    }
}
export class SaleOffItem implements IBilling{
    getPrice(quantity: number, price: number, saleOf: number): number {
        return price * quantity * (100 - saleOf)/100
    }
}
export class CustomerBill {
    private list: number[] = []
    constructor(public item: IBilling){}
    public addToCart(quantity: number, price: number, saleOf?: number){
        this.list.push(this.item.getPrice(quantity, price, saleOf))
    }
    public getTotal(){
        let totalPrice :number = 0
        this.list.forEach((item: number) => totalPrice += item)
        return totalPrice
    }
}