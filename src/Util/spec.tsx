export interface Detail {
    _id: string,
    name: string,
    images: [any],
    price: number,
    description: string,
    color: string,
    category: {
        name: string,
        gender: string
    },
    size: string,
    weight: string,
    material: string,
    comment: [],
    quantity: number,
    saleOf: number,
    saled: number
}
export interface IUSer {
    userInfor: {
        firstName: string,
        lastName: string,
        phone: number,
        gender: string,
        userId?: string,
        email: string,
        ava: string,
    },
    auth: boolean,
    cart?: Array<CartItem>,
}
export type Params = {
    id?: string;
    productName?: string;
    name?: string;
};
export type Action = {
    type: string,
    payload: any
}
export type OrderItem = {
    productId: string,
    quantityInCart: number,
    cost: number,
    productName: String,
}
export type Order = {
    status: string,
    createAt?: Date,
    total: number,
    name: string,
    phone: number,
    _id?: string,
    details: [OrderItem],
    address: string,
    delivery: number,
    email: string,
    userId?: string,
    discount: number
}
export type Vouncher = {
    name: string,
    code: string,
    startDate: Date,
    endDate: Date,
    applyFor: number,
    discount: number,
    description: string
}
export type CartItem = {
   _id: string,
    name: string,
    quantity: number,
    images: string,
    saleOf: number,
    price: number,
    quantityInCart: number
}
export type CartList = [CartItem]
